import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IFileState } from './file.state';

export const selectState = createFeatureSelector<IFileState>('file');
export const selectFiles = createSelector(selectState, state => state.files);
export const selectIds = createSelector(selectState, state => Object.keys(state.files));
export const selectActive = createSelector(selectState, state => state.active);
export const selectActiveFile = createSelector(selectState, state => state.files[state.active]);

export const selectPaths = createSelector(selectState, state => {
  const paths: { [path: string]: string } = { };

  for (const id of Object.keys(state.files)) {
    paths[state.files[id].path] = id;
  }

  return paths;
});

export const selectLines = createSelector(selectState, state => {
  if (state.files[state.active] && state.files[state.active].text) {
    return (state.files[state.active].text.match(/\n/g) || []).length + 1;
  }

  return 0;
});

export const selectLength = createSelector(selectState, state => {
  if (state.files[state.active] && state.files[state.active].text) {
    return state.files[state.active].text.length;
  }

  return 0;
});
