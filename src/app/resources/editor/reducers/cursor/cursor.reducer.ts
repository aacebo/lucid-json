import { createReducer, on } from '@ngrx/store';
import CodeMirror from 'codemirror';

import * as actions from '../../actions';

export const cursor = createReducer<CodeMirror.Position | undefined>(
  undefined,
  on(actions.setCursor, (_, a) => a.cursor),
);
