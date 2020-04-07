import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './file.state';
import * as effects from './file.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('file', reducers),
    EffectsModule.forFeature([effects.FileEffects]),
  ],
})
export class FileModule { }
