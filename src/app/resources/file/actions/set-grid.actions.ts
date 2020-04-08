import { createAction, props } from '@ngrx/store';

import { IGrid } from '../models';

export const setGrid = createAction(
  '[FILE] SetGrid',
  props<{ readonly path: string; readonly grid?: IGrid; }>(),
);
