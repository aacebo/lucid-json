import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';

import { reducers } from './file.state';

@NgModule({
  imports: [
    StoreModule.forFeature('file', reducers),
  ],
})
export class FileModule { }
