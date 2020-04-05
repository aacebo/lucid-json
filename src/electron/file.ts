import { ipcMain, BrowserWindow } from 'electron';
import * as fs from 'fs';
import * as path from 'path';

export class File {
  constructor(private readonly _window: BrowserWindow) {
    ipcMain.on('file.open', async (_, filePath) => {
      let text = '';
      const name = path.basename(filePath);
      const stream = fs.createReadStream(filePath);

      for await (const chunk of stream) {
        text += chunk;
      }

      this._window.webContents.send('file.read', {
        name,
        path: filePath,
        text,
      });
    });
  }
}
