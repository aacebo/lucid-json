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

    this._electronService.on('open', async () => {
      const res = await this._electronService.showOpenDialog({
        properties: ['openFile'],
        filters: [{ name: 'json', extensions: ['json'] }],
      });

      if (res.filePaths.length > 0) {
        this._electronService.send('file.open', res.filePaths[0]);
      }
    });

    this._electronService.on('file.read', (e: IFile) => {
      this.fileService.set(e.name, e.path, e.text);
    });
  }

  onEdit(e: { e: string; path: string; }) {
    this.fileService.update(e.path, e.e);
  }

  onActivate(e: string) {
    this.fileService.setActive(e);
  }

  onRemove(e: string) {
    this.fileService.remove(e);
  }

  onGrid(e: { path: string; grid: IGrid }) {
    this.fileService.setGrid(e.path, e.grid);
  }

  onCursorChange(e: CodeMirror.Position) {
    this.editorService.setCursor(e);
  }

  onFormat(path: string, pretty: boolean) {
    this.fileService.format(path, pretty);
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
