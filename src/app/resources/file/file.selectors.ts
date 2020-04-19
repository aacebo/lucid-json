import { createFeatureSelector, createSelector } from '@ngrx/store';
import toJsonSchema from 'to-json-schema';
import jsonToTs from 'json-to-ts';
import yamljs from 'js-yaml';

import { IFileState } from './file.state';
import { tryParseJSON } from './try-parse-json.util';

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

export const selectJson = createSelector(selectActiveFile, activeFile => {
  return activeFile ? tryParseJSON(activeFile.text) : undefined;
});

export const selectJsonSchema = createSelector(selectJson, json => {
  return json ? toJsonSchema(json) : undefined;
});

export const selectTs = createSelector(selectJson, json => {
  return json ? jsonToTs(json).join('\n\n') : undefined;
});

export const selectYml = createSelector(selectJson, json => {
  return json ? yamljs.safeDump(json) : undefined;
});
