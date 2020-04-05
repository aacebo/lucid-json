import { createAction, props } from '@ngrx/store';

export const setTree = createAction(
  '[FILE] SetTree',
  props<{ readonly path: string; readonly tree: boolean }>(),
);
