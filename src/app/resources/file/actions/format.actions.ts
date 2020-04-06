import { createAction, props } from '@ngrx/store';

export const format = createAction(
  '[FILE] Format',
  props<{ readonly path: string; readonly pretty: boolean }>(),
);
