import { createAction, props } from '@ngrx/store';

export const format = createAction(
  '[FILE] Format',
  props<{ readonly id: string; readonly pretty: boolean }>(),
);
