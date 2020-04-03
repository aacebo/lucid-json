import { createReducer } from '@ngrx/store';
import { mutableOn } from 'ngrx-etc';

import { File } from '../../models';
import * as actions from '../../actions';

export const files = createReducer<{ [path: string]: File }>(
  { },
  mutableOn(actions.set, (_, a) => {
    _[a.path] = new File(a.name, a.path, a.text);
  }),
  mutableOn(actions.update, (_, a) => {
    _[a.path].text = a.text;
  }),
);
