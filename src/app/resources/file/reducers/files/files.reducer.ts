import { createReducer } from '@ngrx/store';
import { mutableOn } from 'ngrx-etc';
import * as uuid from 'uuid';

import { IFile } from '../../models';
import * as actions from '../../actions';

export const files = createReducer<{ [id: string]: IFile }>(
  { },
  mutableOn(actions.add, (_, a) => {
    const id = uuid.v1();
    _[id] = { id, ...a.file };
  }),
);
