import { app, MenuItemConstructorOptions, MenuItem, Menu } from 'electron';
import { Subject } from 'rxjs';

const isMac = process.platform === 'darwin';

export class AppMenu {
  readonly click$ = new Subject<{ readonly cmd: string; readonly data?: any }>();

  private readonly _menu: (MenuItemConstructorOptions | MenuItem)[] = [
    ...(isMac ? [{
      label: app.getName(),
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
        { label: 'Open', click: () => this.click$.next({ cmd: 'open' }) },
        { type: 'separator' },
        isMac ? { role: 'close' } : { role: 'quit' },
      ],
    },
  ] as any;

  constructor() {
    Menu.setApplicationMenu(Menu.buildFromTemplate(this._menu));
  }
}
