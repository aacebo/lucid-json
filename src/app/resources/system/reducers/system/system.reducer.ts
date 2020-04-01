import { createReducer, on } from '@ngrx/store';

import { ISystem } from '../../models';
import * as actions from '../../actions';

export const system = createReducer<ISystem | undefined>(
  undefined,
  on(actions.setSystem, (_, a) => a.system),
);
