import { createReducer, on } from '@ngrx/store';
import { IPosition } from 'monaco-editor';

import * as actions from '../../actions';

export const cursor = createReducer<IPosition | undefined>(
  undefined,
  on(actions.setCursor, (_, a) => a.cursor),
);
