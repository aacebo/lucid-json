import { createAction, props } from '@ngrx/store';

export const set = createAction(
  '[FILE] Set',
  props<{
    readonly name: string;
    readonly path: string;
    readonly text: string;
  }>(),
);
