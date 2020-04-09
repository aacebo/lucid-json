import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { UniToastService, UniToastType, UniToastPosition } from '@uniform/components';
import CodeMirror from 'codemirror';

import { ElectronService } from './core/services/electron';
import { ISystem, SystemService } from './resources/system';
import { FileService, IFile, IGrid } from './resources/file';
import { EditorService } from './resources/editor';

@Component({
  selector: 'luc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    readonly systemService: SystemService,
    readonly fileService: FileService,
    readonly editorService: EditorService,
    private readonly _electronService: ElectronService,
    private readonly _toastService: UniToastService,
  ) { }

  ngOnInit() {
    this._electronService.on('system', (system: ISystem) => {
      this.systemService.setSystem(system);
    });

    this._electronService.on('file.open', (e: IFile) => {
      this.fileService.set(e.path, e.name, e.text);
    });

    this._electronService.on('file.new', () => {
      this.fileService.set();
    });
  }

  onEdit(e: { e: string; id: string; }) {
    this.fileService.update(e.id, e.e);
  }

  onActivate(e: string) {
    this.fileService.setActive(e);
  }

  onRemove(e: string) {
    this.fileService.remove(e);
  }

  onGrid(e: { id: string; grid: IGrid }) {
    this.fileService.setGrid(e.id, e.grid);
  }

  onCursorChange(e: CodeMirror.Position) {
    this.editorService.setCursor(e);
  }

  onFormat(id: string, pretty: boolean) {
    this.fileService.format(id, pretty);
  }

  onClipboard(e: string) {
    this._electronService.clipboard.writeText(e, 'clipboard');
    this._toastService.open({
      type: UniToastType.Success,
      position: UniToastPosition.BottomRight,
      message: 'Copied to clipboard!',
      duration: 5000,
    });
  }
}
