import { app, MenuItemConstructorOptions, MenuItem, Menu } from 'electron';
import { Subject } from 'rxjs';

const isMac = process.platform === 'darwin';

export class AppMenu {
  readonly newFile$ = new Subject<void>();
  readonly openFile$ = new Subject<void>();
  readonly exportFile$ = new Subject<void>();

  private readonly _menu: (MenuItemConstructorOptions | MenuItem)[] = [
    ...(isMac ? [{
      label: app.name,
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    }] : []),
    {
      label: 'File',
      submenu: [
        { label: 'New', accelerator: 'CmdOrCtrl+Alt+N', click: () => this.newFile$.next() },
        { label: 'Open', accelerator: 'CmdOrCtrl+Alt+O', click: () => this.openFile$.next() },
        { label: 'Export', accelerator: 'CmdOrCtrl+Alt+E', click: () => this.exportFile$.next() },
        { type: 'separator' },
        { role: isMac ? 'close' : 'quit' },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'CmdOrCtrl+Z', role: 'undo' },
        { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', role: 'redo' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'CmdOrCtrl+X', role: 'cut' },
        { label: 'Copy', accelerator: 'CmdOrCtrl+C', role: 'copy' },
        { label: 'Paste', accelerator: 'CmdOrCtrl+V', role: 'paste' },
        { label: 'Select All', accelerator: 'CmdOrCtrl+A', role: 'selectAll' },
      ],
    },
  ] as any;

  constructor() {
    Menu.setApplicationMenu(Menu.buildFromTemplate(this._menu));
  }
}
