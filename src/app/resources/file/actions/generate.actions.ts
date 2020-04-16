import { createAction, props } from '@ngrx/store';

export const generate = createAction(
  '[FILE] Generate',
  props<{
    readonly id: string;
    readonly ts?: string;
    readonly json?: any;
    readonly schema?: any;
    readonly yml?: string;
  }>(),
);
