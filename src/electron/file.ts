import { ipcMain, BrowserWindow } from 'electron';
import * as fs from 'fs';
import * as path from 'path';

export class File {
  constructor(private readonly _window: BrowserWindow) {
    ipcMain.on('file', (_, filePath) => {
      const name = path.basename(filePath);
      const file = fs.readFileSync(filePath);
      this._window.webContents.send('file.read', {
        name,
        path: filePath,
        text: file.toString(),
      });
    });
  }
}
