import { Action, combineReducers } from '@ngrx/store';

import { IFile } from './models';
import * as fromReducers from './reducers';

export interface IFileState {
  readonly files: { [path: string]: IFile };
}

export function reducers(state: IFileState, action: Action) {
  return combineReducers<IFileState>({
    files: fromReducers.files,
  })(state, action);
}
