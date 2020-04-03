import { createAction, props } from '@ngrx/store';

export const update = createAction(
  '[FILE] Update',
  props<{ readonly path: string; readonly text: string; }>(),
);
