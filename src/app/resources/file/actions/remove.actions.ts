import { createAction, props } from '@ngrx/store';

export const remove = createAction(
  '[FILE] Remove',
  props<{ readonly id: string; }>(),
);
