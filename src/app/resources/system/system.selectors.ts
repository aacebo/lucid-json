import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ISystemState } from './system.state';

export const selectState = createFeatureSelector<ISystemState>('system');
export const selectSystem = createSelector(selectState, state => state.system);
export const selectIsMac = createSelector(selectSystem, system => system ? system.platform === 'darwin' : false);
