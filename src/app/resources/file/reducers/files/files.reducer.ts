import { createReducer } from '@ngrx/store';
import { mutableOn } from 'ngrx-etc';

import { IFile } from '../../models';
import * as actions from '../../actions';

export const files = createReducer<{ [path: string]: IFile }>(
  { },
  mutableOn(actions.set, (_, a) => {
    _[a.id] = {
      id: a.id,
      name: a.name,
      path: a.path,
      text: a.text || '',
      grid: { editor: true },
    };
  }),
  mutableOn(actions.update, (_, a) => {
    _[a.id].dirty = a.text !== _[a.id].text;
    _[a.id].text = a.text || '';
  }),
  mutableOn(actions.remove, (_, a) => {
    _[a.id] = undefined;
    delete _[a.id];
  }),
  mutableOn(actions.grid, (_, a) => {
    _[a.id].grid = a.grid;
  }),
  mutableOn(actions.format, (_, a) => {
    let text: string;

    if (a.pretty) {
      text = JSON.stringify(_[a.id].json, undefined, 2);
    } else {
      text = JSON.stringify(_[a.id].json);
    }

    const dirty = text !== _[a.id].text;

    _[a.id] = {
      ..._[a.id],
      text,
      dirty,
    };
  }),
  mutableOn(actions.generate, (_, a) => {
    _[a.id].typescript = a.typescript;
    _[a.id].json = a.json;
    _[a.id].schema = a.schema;
  }),
  mutableOn(actions.save, (_, a) => {
    if (a.saveAs) {
      _[a.id].path = a.path;
      _[a.id].name = a.name;
    }

    _[a.id].dirty = false;
  }),
);
