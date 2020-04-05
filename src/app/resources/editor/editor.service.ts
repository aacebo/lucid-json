import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import CodeMirror from 'codemirror';

import { IEditorState } from './editor.state';
import * as selectors from './editor.selectors';
import * as actions from './actions';

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  readonly state$: Observable<IEditorState>;
  readonly cursor$: Observable<CodeMirror.Position | undefined>;

  constructor(private readonly _store$: Store<IEditorState>) {
    this.state$ = this._store$.pipe(select(selectors.selectState));
    this.cursor$ = this._store$.pipe(select(selectors.selectCursor));
  }

  setCursor(cursor: CodeMirror.Position) {
    this._store$.dispatch(actions.setCursor({ cursor }));
  }
}
