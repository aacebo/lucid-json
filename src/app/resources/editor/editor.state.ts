import { Action, combineReducers } from '@ngrx/store';
import CodeMirror from 'codemirror';

import * as fromReducers from './reducers';

export interface IEditorState {
  readonly cursor?: CodeMirror.Position;
}

export function reducers(state: IEditorState, action: Action) {
  return combineReducers<IEditorState>({
    cursor: fromReducers.cursor,
  })(state, action);
}
