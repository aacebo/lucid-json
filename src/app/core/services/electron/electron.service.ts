import { Injectable, NgZone } from '@angular/core';
import {
  App,
  BrowserWindow,
  IpcRenderer,
  MenuItemConstructorOptions,
  Remote,
  MessageBoxOptions,
  IpcRendererEvent,
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

  sendSync<T = any>(name: string, data?: T) {
    return this._renderer.sendSync(name, data);
  }

  invoke<T = any>(name: string, data?: T) {
    return this._renderer.invoke(name, data);
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

  on<T = any>(name: string, cb: (e: IpcRendererEvent, data: T) => void) {
    this._renderer.on(name, (e, data: T) => {
      this._ngZone.run(() => cb(e, data));
    });
  }

  once<T = any>(name: string, cb: (e: IpcRendererEvent, data: T) => void) {
    this._renderer.once(name, (e, data: T) => {
      this._ngZone.run(() => cb(e, data));
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
