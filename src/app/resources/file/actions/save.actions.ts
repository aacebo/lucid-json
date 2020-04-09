import { createAction, props } from '@ngrx/store';

export const save = createAction(
  '[FILE] Save',
  props<{
    readonly id: string;
    readonly path?: string;
    readonly name?: string;
    readonly saveAs?: boolean;
  }>(),
);
