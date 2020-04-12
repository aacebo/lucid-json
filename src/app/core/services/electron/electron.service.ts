import { Injectable, NgZone } from '@angular/core';
import {
  App,
  BrowserWindow,
  IpcRenderer,
  MenuItemConstructorOptions,
  Remote,
  MessageBoxOptions,
} from 'electron';

@Injectable({
  providedIn: 'root',
})
export class ElectronService {
  readonly app: App;
  readonly window: BrowserWindow;

  private readonly _renderer: IpcRenderer;
  private readonly _remote: Remote;

  get clipboard() {
    return this._remote.clipboard;
  }

  get BrowserWindow() {
    return this._remote.BrowserWindow;
  }

  constructor(private readonly _ngZone: NgZone) {
    const { ipcRenderer, remote, app } = window.require('electron');

    this.window = remote.getCurrentWindow();
    this._renderer = ipcRenderer;
    this._remote = remote;
    this.app = app;
  }

  setMenu(options: Array<MenuItemConstructorOptions>) {
    this._remote.Menu.setApplicationMenu(this._remote.Menu.buildFromTemplate(options));
  }

  send<T = any>(name: string, data?: T) {
    this._renderer.send(name, data);
  }

  copy<T = any>(data: T) {
    this._remote.clipboard.write(data);
  }

  notification(title: string, body: string) {
    return new this._remote.Notification({
      title,
      body,
    });
  }

  on(name: string, cb: (...args: any[]) => void) {
    this._renderer.on(name, (_, data: any) => {
      this._ngZone.run(() => cb(data));
    });
  }

  once(name: string, cb: (...args: any[]) => void) {
    this._renderer.once(name, (_, data: any) => {
      this._ngZone.run(() => cb(data));
    });
  }

  removeAllListeners(channel: string) {
    this._renderer.removeAllListeners(channel);
  }

  getGlobal<T = any>(prop: string) {
    return this._remote.getGlobal(prop) as T;
  }

  showMessageDialog(options: MessageBoxOptions) {
    return this._remote.dialog.showMessageBox(this.window, options);
  }
}
