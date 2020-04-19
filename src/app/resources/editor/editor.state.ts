import { Action, combineReducers } from '@ngrx/store';
import { IPosition } from 'monaco-editor';

import * as fromReducers from './reducers';

export interface IEditorState {
  readonly cursor?: IPosition;
}

export function reducers(state: IEditorState, action: Action) {
  return combineReducers<IEditorState>({
    cursor: fromReducers.cursor,
  })(state, action);
}
