import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IFileState } from './file.state';
import { File } from './models';
import * as selectors from './file.selectors';
import * as actions from './actions';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  readonly state$: Observable<IFileState>;
  readonly files$: Observable<{ [path: string]: File }>;
  readonly paths$: Observable<string[]>;
  readonly active$: Observable<string | undefined>;
  readonly activeFile$: Observable<File | undefined>;

  constructor(private readonly _store$: Store<IFileState>) {
    this.state$ = this._store$.pipe(select(selectors.selectState));
    this.files$ = this._store$.pipe(select(selectors.selectFiles));
    this.paths$ = this._store$.pipe(select(selectors.selectPaths));
    this.active$ = this._store$.pipe(select(selectors.selectActive));
    this.activeFile$ = this._store$.pipe(select(selectors.selectActiveFile));
  }

  set(name: string, path: string, text: string) {
    this._store$.dispatch(actions.set({ name, path, text }));
  }

  setActive(path: string) {
    this._store$.dispatch(actions.setActive({ path }));
  }
}
