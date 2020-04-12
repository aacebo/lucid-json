import { createReducer, on } from '@ngrx/store';

import * as actions from '../../actions';

export const fullscreen = createReducer<boolean>(
  false,
  on(actions.setFullscreen, (_, a) => a.fullscreen),
);
