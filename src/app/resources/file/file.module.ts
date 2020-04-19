import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './file.state';

@NgModule({
  imports: [
    StoreModule.forFeature('file', reducers),
    EffectsModule.forFeature([]),
  ],
})
export class FileModule { }
