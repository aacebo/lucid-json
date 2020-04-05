import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import CodeMirror from 'codemirror';

import { File } from '../../resources/file';

@Component({
  selector: 'luc-files-tab-group',
  templateUrl: './files-tab-group.component.html',
  styleUrls: ['./files-tab-group.component.scss'],
  host: { class: 'luc-files-tab-group' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FilesTabGroupComponent {
  @Input() files: { [path: string]: File } = { };

  @Input()
  get paths() { return this._paths; }
  set paths(v) {
    this._paths = v;
    this.tab = this.paths.indexOf(this._active);
    this._cdr.markForCheck();
  }
  private _paths: string[] = [];

  @Input()
  get active() { return this._active; }
  set active(v) {
    this._active = v;
    this.tab = this.paths.indexOf(v);
    this._cdr.markForCheck();
  }
  private _active?: string;

  // tabs
  @Output() edit = new EventEmitter<{ e: string; path: string; }>();
  @Output() activate = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();

  // editor
  @Output() cursorChange = new EventEmitter<CodeMirror.Position>();

  readonly tree$ = new BehaviorSubject(false);

  tab = 0;

  constructor(private readonly _cdr: ChangeDetectorRef) { }

  onViewTree() {
    this.tree$.next(true);
  }

  onTextChange(e: string) {
    this.edit.emit({ e, path: this.active });
  }

  onTabChange(e: number) {
    if (this.paths[e]) {
      this.activate.emit(this.paths[e]);
    }
  }

  onClose(e: string) {
    const idx = this.paths.indexOf(e);

    if (this.paths.length > 1 && e === this.active) {
      this.activate.emit(this.paths[idx + 1]);
    }

    this.remove.emit(e);
  }
}
