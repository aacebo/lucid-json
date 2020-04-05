import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IEditorState } from './editor.state';

export const selectState = createFeatureSelector<IEditorState>('editor');
export const selectCursor = createSelector(selectState, state => state.cursor);
