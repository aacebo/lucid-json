import { createReducer } from '@ngrx/store';
import { mutableOn } from 'ngrx-etc';
import * as generateSchema from 'generate-schema';

import { IFile } from '../../models';
import { tryParseJSON } from '../../try-parse-json.util';
import * as actions from '../../actions';

export const files = createReducer<{ [path: string]: IFile }>(
  { },
  mutableOn(actions.set, (_, a) => {
    const json = tryParseJSON(a.text);

    _[a.path] = {
      name: a.name,
      path: a.path,
      text: a.text,
      json,
      schema: json ? generateSchema.json(json) : undefined,
    };
  }),
  mutableOn(actions.update, (_, a) => {
    const json = tryParseJSON(a.text);

    _[a.path].text = a.text;
    _[a.path].json = json;
    _[a.path].schema = json ? generateSchema.json(json) : undefined;
    _[a.path].dirty = true;
  }),
  mutableOn(actions.remove, (_, a) => {
    _[a.path] = undefined;
    delete _[a.path];
  }),
  mutableOn(actions.setTree, (_, a) => {
    _[a.path].tree = a.tree;
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
);
