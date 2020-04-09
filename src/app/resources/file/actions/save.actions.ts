import { createAction, props } from '@ngrx/store';

export const save = createAction(
  '[FILE] Save',
  props<{ readonly id: string; }>(),
);
