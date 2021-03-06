import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import toJsonSchema from 'to-json-schema';
import jsonToTs from 'json-to-ts';
import yamljs from 'js-yaml';

import { tryParseJSON } from './try-parse-json.util';
import * as actions from './actions';

@Injectable()
export class FileEffects {
  readonly generate$ = createEffect(() => this._actions$.pipe(
    ofType(actions.set, actions.update),
    map(a => {
      const json = tryParseJSON(a.text);
      const schema = json ? toJsonSchema(json) : undefined;
      const ts = json ? jsonToTs(json) : undefined;
      const yml = json ? yamljs.safeDump(json) : undefined;

      return actions.generate({
        id: a.id,
        json,
        schema,
        ts: ts ? ts.join('\n\n') : undefined,
        yml,
      });
    }),
  ));

  constructor(private readonly _actions$: Actions) { }
}
