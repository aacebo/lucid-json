import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';

import { reducers } from './editor.state';

@NgModule({
  imports: [
    StoreModule.forFeature('editor', reducers),
  ],
})
export class EditorModule { }
