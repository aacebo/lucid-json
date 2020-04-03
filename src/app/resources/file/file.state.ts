import { Action, combineReducers } from '@ngrx/store';

import { File } from './models';
import * as fromReducers from './reducers';

export interface IFileState {
  readonly active?: string;
  readonly files: { [path: string]: File };
}

export function reducers(state: IFileState, action: Action) {
  return combineReducers<IFileState>({
    active: fromReducers.active,
    files: fromReducers.files,
  })(state, action);
}
