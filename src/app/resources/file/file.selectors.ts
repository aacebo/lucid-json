import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IFileState } from './file.state';

export const selectState = createFeatureSelector<IFileState>('file');
export const selectFiles = createSelector(selectState, state => state.files);
export const selectIds = createSelector(selectState, state => Object.keys(state.files));
