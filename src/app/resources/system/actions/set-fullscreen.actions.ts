import { createAction, props } from '@ngrx/store';

export const setFullscreen = createAction(
  '[SYSTEM] SetFullscreen',
  props<{ readonly fullscreen: boolean; }>(),
);
