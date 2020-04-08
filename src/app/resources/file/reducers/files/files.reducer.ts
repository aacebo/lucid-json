import { createReducer } from '@ngrx/store';
import { mutableOn } from 'ngrx-etc';

import { IFile } from '../../models';
import * as actions from '../../actions';

export const files = createReducer<{ [path: string]: IFile }>(
  { },
  mutableOn(actions.set, (_, a) => {
    _[a.path] = {
      name: a.name,
      path: a.path,
      text: a.text,
      visible: {},
    };
  }),
  mutableOn(actions.update, (_, a) => {
    _[a.path].text = a.text;
    _[a.path].dirty = true;
  }),
  mutableOn(actions.remove, (_, a) => {
    _[a.path] = undefined;
    delete _[a.path];
  }),
  mutableOn(actions.setVisible, (_, a) => {
    _[a.path].visible.tree = a.tree;
    _[a.path].visible.schema = a.schema;
    _[a.path].visible.typescript = a.typescript;
  }),
  mutableOn(actions.format, (_, a) => {
    let text: string;

    if (a.pretty) {
      text = JSON.stringify(_[a.path].json, undefined, 2);
    } else {
      text = JSON.stringify(_[a.path].json);
    }

    _[a.path] = {
      ..._[a.path],
      text,
      dirty: true,
    };
  }),
  mutableOn(actions.setGenerated, (_, a) => {
    _[a.path].typescript = a.typescript;
    _[a.path].json = a.json;
    _[a.path].schema = a.schema;
  }),
);
