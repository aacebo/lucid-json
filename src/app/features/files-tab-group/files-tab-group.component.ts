import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { IUniJsonTreeNode, UniHotkeyService } from '@uniform/components';
import { IPosition } from 'monaco-editor';

import { IFile, IGrid } from '../../resources/file';
import { JsonEditorComponent } from '../json-editor';

@Component({
  selector: 'luc-files-tab-group',
  templateUrl: './files-tab-group.component.html',
  styleUrls: ['./files-tab-group.component.scss'],
  host: {
    class: 'luc-files-tab-group',
    '(window:resize)': 'onFlexChange()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FilesTabGroupComponent implements OnInit, OnDestroy {
  @Input()
  get files() { return this._files; }
  set files(v) {
    this._files = v;
    this._cdr.markForCheck();
    setTimeout(() => this.onFlexChange());
  }
  private _files: { [id: string]: IFile } = { };

  @Input()
  get ids() { return this._ids; }
  set ids(v) {
    this._ids = v;
    this.tab = this._ids.indexOf(this._active);
    this._cdr.markForCheck();
  }
  private _ids: string[] = [];

  @Input()
  get active() { return this._active; }
  set active(v) {
    this._active = v;
    this.tab = this.ids.indexOf(v);
    this._cdr.markForCheck();
  }
  private _active?: string;

  @Output() activate = new EventEmitter<string>();
  @Output() clipboard = new EventEmitter<string>();
  @Output() remove = new EventEmitter<{ id: string; nextId?: string; dirty?: boolean; }>();
  @Output() edit = new EventEmitter<{ id: string; text: string; }>();
  @Output() grid = new EventEmitter<{ id: string; grid: IGrid; }>();
  @Output() save = new EventEmitter<{ id: string; path?: string; text: string; }>();
  @Output() cursorChange = new EventEmitter<IPosition>();

  @ViewChild(JsonEditorComponent)
  readonly jsonEditor?: JsonEditorComponent;

  tab = 0;

  constructor(
    private readonly _hotkeyService: UniHotkeyService,
    private readonly _cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this._hotkeyService.add('mod+s', 'Save', this._onSave.bind(this));
  }

  ngOnDestroy() {
    this._hotkeyService.remove('mod+s');
  }

  toggleGrid(key: keyof IGrid) {
    this.grid.emit({
      id: this.active,
      grid: {
        ...this.files[this.active].grid,
        [key]: !this.files[this.active].grid[key],
      },
    });
  }

  onTextChange(e: string) {
    this.edit.emit({ id: this.active, text: e });
  }

  onTabChange(e: number) {
    if (this.ids[e]) {
      this.activate.emit(this.ids[e]);
    }
  }

  onPropertyValueClick(e: IUniJsonTreeNode) {
    this.clipboard.emit(e.description);
  }

  onFlexChange() {
    if (this.jsonEditor) {
      this.jsonEditor.editor.layout();
    }
  }

  onClose(e: Event, id: string) {
    e.stopImmediatePropagation();
    e.preventDefault();

    const idx = this.ids.indexOf(id);
    let nextId: string;

    if (this.ids.length > 1 && id === this.active && idx > -1) {
      if (idx > 0) {
        nextId = this.ids[idx - 1];
      } else {
        nextId = this.ids[idx + 1];
      }
    }

    this.remove.emit({
      id,
      nextId,
      dirty: this.files[id].dirty,
    });
  }

  private _onSave() {
    if (this.files[this.active].dirty) {
      this.save.emit({
        id: this.active,
        path: this.files[this.active].path,
        text: this.files[this.active].text,
      });
    }
  }
}
