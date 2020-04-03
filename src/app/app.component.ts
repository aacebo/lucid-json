import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ElectronService } from './core/services/electron';
import { ISystem, SystemService } from './resources/system';
import { FileService, File } from './resources/file';

@Component({
  selector: 'luc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  readonly tree$ = new BehaviorSubject(false);

  constructor(
    readonly systemService: SystemService,
    readonly fileService: FileService,
    private readonly _electronService: ElectronService,
    private readonly _cdr: ChangeDetectorRef,
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
        this._electronService.send('file', res.filePaths[0]);
      }
    });

    this._electronService.on('file.read', (e: File) => {
      this.fileService.set(e.name, e.path, e.text);
      this._cdr.markForCheck();
    });
  }

  onViewTree() {
    this.tree$.next(true);
  }

  onTextChange(e: string, path: string) {
    this.fileService.update(path, e);
  }
}
