import { createAction, props } from '@ngrx/store';

export const set = createAction(
  '[FILE] Set',
  props<{
    readonly id: string;
    readonly path?: string;
    readonly name?: string;
    readonly text?: string;
  }>(),
);
