import { createAction, props } from '@ngrx/store';
import CodeMirror from 'codemirror';

export const setCursor = createAction(
  '[EDITOR] SetCursor',
  props<{ readonly cursor: CodeMirror.Position }>(),
);
