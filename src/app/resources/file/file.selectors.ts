import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IFileState } from './file.state';

export const selectState = createFeatureSelector<IFileState>('file');
export const selectFiles = createSelector(selectState, state => state.files);
export const selectIds = createSelector(selectState, state => Object.keys(state.files));
export const selectActive = createSelector(selectState, state => state.active);

export const selectLines = createSelector(selectState, state => {
  if (state.files[state.active]) {
    return (state.files[state.active].text.match(/\n/g) || []).length + 1;
  }

  return 0;
});
