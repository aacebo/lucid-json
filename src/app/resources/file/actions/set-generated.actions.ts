import { createAction, props } from '@ngrx/store';

export const setGenerated = createAction(
  '[FILE] SetGenerated',
  props<{
    readonly id: string;
    readonly typescript?: string;
    readonly json?: any;
    readonly schema?: any;
  }>(),
);
