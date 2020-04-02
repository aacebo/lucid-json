import { createAction, props } from '@ngrx/store';

export const add = createAction(
  '[FILE] Add',
  props<{ readonly file: File }>(),
);
