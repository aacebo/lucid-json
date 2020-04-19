import { createAction, props } from '@ngrx/store';
import { IPosition } from 'monaco-editor';

export const setCursor = createAction(
  '[EDITOR] SetCursor',
  props<{ readonly cursor: IPosition }>(),
);
