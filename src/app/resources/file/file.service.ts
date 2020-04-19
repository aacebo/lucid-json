import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as uuid from 'uuid';

import { IFileState } from './file.state';
import { IFile, IGrid } from './models';
import * as selectors from './file.selectors';
import * as actions from './actions';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  readonly state$: Observable<IFileState>;
  readonly files$: Observable<{ [id: string]: IFile }>;
  readonly paths$: Observable<{ [path: string]: string }>;
  readonly ids$: Observable<string[]>;
  readonly active$: Observable<string | undefined>;
  readonly activeFile$: Observable<IFile | undefined>;
  readonly lines$: Observable<number>;
  readonly length$: Observable<number>;
  readonly json$: Observable<any | undefined>;
  readonly jsonSchema$: Observable<any | undefined>;
  readonly ts$: Observable<string | undefined>;
  readonly yml$: Observable<string | undefined>;

  constructor(private readonly _store$: Store<IFileState>) {
    this.state$ = this._store$.pipe(select(selectors.selectState));
    this.files$ = this._store$.pipe(select(selectors.selectFiles));
    this.paths$ = this._store$.pipe(select(selectors.selectPaths));
    this.ids$ = this._store$.pipe(select(selectors.selectIds));
    this.active$ = this._store$.pipe(select(selectors.selectActive));
    this.activeFile$ = this._store$.pipe(select(selectors.selectActiveFile));
    this.lines$ = this._store$.pipe(select(selectors.selectLines));
    this.length$ = this._store$.pipe(select(selectors.selectLength));
    this.json$ = this._store$.pipe(select(selectors.selectJson));
    this.jsonSchema$ = this._store$.pipe(select(selectors.selectJsonSchema));
    this.ts$ = this._store$.pipe(select(selectors.selectTs));
    this.yml$ = this._store$.pipe(select(selectors.selectYml));
  }

  set(path?: string, name?: string, text?: string) {
    this._store$.dispatch(actions.set({ id: uuid.v1(), path, name, text }));
  }

  update(id: string, text?: string) {
    this._store$.dispatch(actions.update({ id, text }));
  }

  remove(id: string) {
    this._store$.dispatch(actions.remove({ id }));
  }

  format(id: string, pretty: boolean) {
    this._store$.dispatch(actions.format({ id, pretty }));
  }

  save(id: string, path?: string, name?: string, saveAs?: boolean) {
    this._store$.dispatch(actions.save({ id, path, name, saveAs }));
  }

  activate(id: string) {
    this._store$.dispatch(actions.activate({ id }));
  }

  grid(id: string, grid: IGrid) {
    this._store$.dispatch(actions.grid({ id, grid }));
  }
}
