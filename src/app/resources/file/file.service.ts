import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IFileState } from './file.state';
import { IFile } from './models';
import * as selectors from './file.selectors';
import * as actions from './actions';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  readonly state$: Observable<IFileState>;
  readonly files$: Observable<{ [id: string]: IFile }>;
  readonly ids$: Observable<string[]>;

  constructor(private readonly _store$: Store<IFileState>) {
    this.state$ = this._store$.pipe(select(selectors.selectState));
    this.files$ = this._store$.pipe(select(selectors.selectFiles));
    this.ids$ = this._store$.pipe(select(selectors.selectIds));
  }

  add(file: File) {
    this._store$.dispatch(actions.add({ file }));
  }
}
