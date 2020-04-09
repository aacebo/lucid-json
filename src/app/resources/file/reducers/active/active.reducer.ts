import { createReducer, on } from '@ngrx/store';

import * as actions from '../../actions';

export const active = createReducer<string | undefined>(
  undefined,
  on(actions.activate, (_, a) => a.id),
  on(actions.set, (_, a) => a.id),
  on(actions.remove, (_, a) => _ === a.id ? undefined : _),
);
