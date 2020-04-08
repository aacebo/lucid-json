import { createAction, props } from '@ngrx/store';

export const setVisible = createAction(
  '[FILE] SetVisible',
  props<{
    readonly path: string;
    readonly tree?: boolean;
    readonly schema?: boolean;
    readonly typescript?: boolean;
  }>(),
);
