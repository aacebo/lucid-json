import { createAction, props } from '@ngrx/store';

export const generate = createAction(
  '[FILE] Generate',
  props<{
    readonly id: string;
    readonly typescript?: string;
    readonly json?: any;
    readonly schema?: any;
    readonly yaml?: string;
  }>(),
);
