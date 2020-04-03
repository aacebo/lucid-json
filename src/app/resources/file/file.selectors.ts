import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IFileState } from './file.state';

export const selectState = createFeatureSelector<IFileState>('file');
export const selectFiles = createSelector(selectState, state => state.files);
export const selectPaths = createSelector(selectState, state => Object.keys(state.files));
export const selectActive = createSelector(selectState, state => state.active);
export const selectActiveFile = createSelector(selectState, state => state.files[state.active]);
