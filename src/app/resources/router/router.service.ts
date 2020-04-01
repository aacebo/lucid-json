import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { RouterReducerState, SerializedRouterStateSnapshot } from '@ngrx/router-store';
import { Observable } from 'rxjs';

import * as selectors from './router.selectors';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  readonly state$: Observable<RouterReducerState>;
  readonly routerState$: Observable<SerializedRouterStateSnapshot | undefined>;
  readonly navigationId$: Observable<number | undefined>;
  readonly activatedRoute$: Observable<ActivatedRouteSnapshot | undefined>;

  constructor(private readonly _store$: Store<RouterReducerState>) {
    this.state$ = this._store$.pipe(select(selectors.selectState));
    this.routerState$ = this._store$.pipe(select(selectors.selectRouterState));
    this.navigationId$ = this._store$.pipe(select(selectors.selectNavigationId));
    this.activatedRoute$ = this._store$.pipe(select(selectors.selectActivatedRoute));
  }
}
