import { createReducer, on } from '@ngrx/store';

import * as actions from '../../actions';

export const active = createReducer<string | undefined>(
  undefined,
  on(actions.setActive, (_, a) => a.path),
  on(actions.set, (_, a) => a.path),
  on(actions.remove, (_, a) => _ === a.path ? undefined : _),
);
