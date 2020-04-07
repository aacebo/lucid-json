import * as electron from 'electron';
import * as devtools from 'electron-devtools-installer';
import * as dotenv from 'dotenv';
import * as dev from 'electron-is-dev';
import * as path from 'path';
import * as url from 'url';
import { compile } from 'json-schema-to-typescript';

import { AppMenu } from './menu';
import { File } from './file';

(global as any).jsonSchemaToTypescript = compile;
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
  readonly file: File;

  private _window: electron.BrowserWindow;
  private _menu = new AppMenu();

  constructor() {
    this._window = new electron.BrowserWindow({
      title: 'Lucid',
      width: 900,
      height: 600,
      minWidth: 600,
      minHeight: 600,
      autoHideMenuBar: true,
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

    this.file = new File(this._window);

    this._menu.click$.subscribe(v => {
      this._window.webContents.send(v.cmd, v.data);
    });

    this._window.loadURL(url.format({
      pathname: path.join(__dirname, '../index.html'),
      protocol: 'file:',
      slashes: true,
    }));

    this._window.webContents.on('dom-ready', () => {
      this._window.show();
      this._window.webContents.send('system', getSystem());

      if (dev) {
        this._window.webContents.openDevTools();
      }
    });

    this._window.on('closed', () => {
      this._window = null;
    });
  }

  quit() {
    electron.app.quit();
  }
}

electron.app.on('ready', () => {
  devtools.default(devtools.REDUX_DEVTOOLS);
  electron.session.defaultSession.webRequest.onHeadersReceived((details, cb) => {
    cb({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          'default-src \'self\'',
          'style-src \'self\' \'unsafe-inline\'',
          'script-src \'self\'',
          'connect-src * data: blob: \'unsafe-inline\'',
          'img-src \'self\' data:',
        ],
      },
    });
  });

  app = new App();
});

electron.app.on('window-all-closed', () => {
  app.quit();
});

electron.app.on('activate', () => {
  if (!app) {
    app = new App();
  }
});
