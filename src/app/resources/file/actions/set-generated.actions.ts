import { createAction, props } from '@ngrx/store';

export const setGenerated = createAction(
  '[FILE] SetGenerated',
  props<{
    readonly path: string;
    readonly typescript?: string;
    readonly json?: any;
    readonly schema?: any;
  }>(),
);

export const setGeneratedFailed = createAction(
  '[FILE] SetGeneratedFailed',
  props<{ readonly error: Error }>(),
);
