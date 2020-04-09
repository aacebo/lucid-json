import { createAction, props } from '@ngrx/store';

export const update = createAction(
  '[FILE] Update',
  props<{
    readonly id: string;
    readonly text: string;
  }>(),
);
