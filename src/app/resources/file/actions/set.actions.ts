import { createAction, props } from '@ngrx/store';

import { IFile } from '../models';

export const set = createAction(
  '[FILE] Set',
  props<IFile>(),
);
