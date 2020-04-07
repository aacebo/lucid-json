import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import toJsonSchema from 'to-json-schema';
import jsonToTs from 'json-to-ts';

import { tryParseJSON } from './try-parse-json.util';
import * as actions from './actions';

@Injectable()
export class FileEffects {
  readonly set$ = createEffect(() => this._actions$.pipe(
    ofType(actions.set, actions.update),
    map(a => {
      const json = tryParseJSON(a.text);
      const schema = json ? toJsonSchema(json) : undefined;
      const typescript = json ? jsonToTs(json) : undefined;

      return actions.setGenerated({
        path: a.path,
        json,
        schema,
        typescript: typescript.join('\n'),
      });
    }),
  ));

  constructor(private readonly _actions$: Actions) { }
}
