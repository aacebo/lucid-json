import { Action, combineReducers } from '@ngrx/store';

import { ISystem } from './models';
import * as fromReducers from './reducers';

export interface ISystemState {
  readonly system?: ISystem;
  readonly fullscreen: boolean;
}

export function reducers(state: ISystemState, action: Action) {
  return combineReducers<ISystemState>({
    system: fromReducers.system,
    fullscreen: fromReducers.fullscreen,
  })(state, action);
}
