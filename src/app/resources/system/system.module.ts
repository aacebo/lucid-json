import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';

import { reducers } from './system.state';

@NgModule({
  imports: [
    StoreModule.forFeature('system', reducers),
  ],
})
export class SystemModule { }
