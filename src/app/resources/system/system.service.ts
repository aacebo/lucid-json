import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ISystemState } from './system.state';
import { ISystem } from './models';
import * as actions from './actions';
import * as selectors from './system.selectors';

@Injectable({
  providedIn: 'root',
})
export class SystemService {
  readonly state$: Observable<ISystemState>;
  readonly system$: Observable<ISystem | undefined>;
  readonly fullscreen$: Observable<boolean>;
  readonly isMac$: Observable<boolean>;

  constructor(private readonly _store$: Store<ISystemState>) {
    this.state$ = this._store$.pipe(select(selectors.selectState));
    this.system$ = this._store$.pipe(select(selectors.selectSystem));
    this.fullscreen$ = this._store$.pipe(select(selectors.selectFullscreen));
    this.isMac$ = this._store$.pipe(select(selectors.selectIsMac));
  }

  setSystem(system: ISystem) {
    this._store$.dispatch(actions.setSystem({ system }));
  }

  setFullscreen(fullscreen: boolean) {
    this._store$.dispatch(actions.setFullscreen({ fullscreen }));
  }
}
