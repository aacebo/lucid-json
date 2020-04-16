import * as electron from 'electron';
import * as devtools from 'electron-devtools-installer';
import * as dotenv from 'dotenv';
import * as dev from 'electron-is-dev';
import * as path from 'path';
import * as url from 'url';

import { AppMenu } from './menu';
import { File } from './file';

dotenv.config({
  debug: dev,
  path: `${__dirname}/../.env`,
});

function getSystem() {
  return {
    pid: process.pid,
    platform: process.platform,
    version: electron.app.getVersion(),
    build: dev ? 'development' : 'production',
  };
}

let app: App;

class App {
  private _window: electron.BrowserWindow;
  private _menu = new AppMenu();

  constructor() {
    this._window = new electron.BrowserWindow({
      title: 'Lucid',
      width: 900,
      height: 600,
      minWidth: 600,
      minHeight: 600,
      autoHideMenuBar: false,
      darkTheme: true,
      show: false,
      frame: process.platform === 'darwin' ? false : true,
      titleBarStyle: process.platform === 'darwin' ? 'hidden' : 'default',
      backgroundColor: '#424242',
      webPreferences: {
        nodeIntegration: true,
        backgroundThrottling: false,
      },
    });

    this._window.loadURL(url.format({
      pathname: path.join(__dirname, '../index.html'),
      protocol: 'file:',
      slashes: true,
    }));

    this._menu.openFile$.subscribe(this._onOpenFile.bind(this));
    this._menu.newFile$.subscribe(() => this._window.webContents.send('file.new'));
    this._menu.exportFile$.subscribe(this._onExportFile.bind(this));

    electron.ipcMain.on('file.save', this._onSaveFile.bind(this));

    this._window.webContents.on('dom-ready', this._onDomReady.bind(this));
    this._window.on('enter-full-screen', () => this._window.webContents.send('fullscreen', true));
    this._window.on('leave-full-screen', () => this._window.webContents.send('fullscreen', false));
    this._window.on('closed', () => this._window = null);
  }

  private async _onExportFile() {
    const res = await electron.dialog.showSaveDialog({
      filters: [{ name: 'Formats', extensions: ['csv', 'ts', 'yml'] }],
    });

    if (res.filePath) {
      this._window.webContents.send('file.export', {
        path: res.filePath,
        ext: path.extname(res.filePath).split('.').pop(),
      });
    }
  }

  private async _onOpenFile() {
    const res = await electron.dialog.showOpenDialog(this._window, {
      properties: ['openFile'],
      filters: [{ name: 'json', extensions: ['json'] }],
    });

    if (res.filePaths.length === 1) {
      const file = await File.read(res.filePaths[0]);

      this._window.webContents.send('file.open', {
        name: file.name,
        path: res.filePaths[0],
        text: file.text,
      });
    }
  }

  private async _onSaveFile(_: electron.IpcMainEvent, e: { path?: string; text: string; }) {
    if (e.path) {
      await File.write(e.path, e.text);
      _.sender.send('file.save.return');
      return;
    }

    const res = await electron.dialog.showSaveDialog(this._window, {
      filters: [{ name: 'json', extensions: ['json'] }],
    });

    if (res.filePath) {
      const name = await File.write(res.filePath, e.text);

      _.sender.send('file.save.return', {
        path: res.filePath,
        name,
      });
    }
  }

  private _onDomReady() {
    this._window.show();
    this._window.webContents.send('system', getSystem());
    this._window.webContents.send('fullscreen', this._window.isFullScreen);

    if (dev) {
      this._window.webContents.openDevTools();
    }
  }
}

electron.app.on('ready', () => {
  devtools.default(devtools.REDUX_DEVTOOLS);
  app = new App();
});

electron.app.on('window-all-closed', () => {
  electron.app.quit();
});

electron.app.on('activate', () => {
  if (!app) {
    app = new App();
  }
});
