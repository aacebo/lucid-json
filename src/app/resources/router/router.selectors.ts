import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';

export const selectState = createFeatureSelector<RouterReducerState>('router');
export const selectRouterState = createSelector(selectState, state => state ? state.state : undefined);
export const selectNavigationId = createSelector(selectState, state => state ? state.navigationId : undefined);

export const selectActivatedRoute = createSelector(selectRouterState, state => {
  if (state) {
    let route = state.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    return route;
  }
});
