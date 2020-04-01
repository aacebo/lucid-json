import { createAction, props } from '@ngrx/store';

import { ISystem } from '../models';

export const setSystem = createAction(
  '[SYSTEM] SetSystem',
  props<{ readonly system: ISystem }>(),
);
