import { createAction, props } from '@ngrx/store';

export const activate = createAction(
  '[FILE] Activate',
  props<{ readonly id: string }>(),
);
