import { createAction, props } from '@ngrx/store';

export const setActive = createAction(
  '[FILE] SetActive',
  props<{ readonly path: string }>(),
);
