import { createAction, props } from '@ngrx/store';

import { IGrid } from '../models';

export const grid = createAction(
  '[FILE] Grid',
  props<{ readonly id: string; readonly grid?: IGrid; }>(),
);
