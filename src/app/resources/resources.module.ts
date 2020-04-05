import { NgModule } from '@angular/core';

import { SystemModule } from './system';
import { FileModule } from './file';
import { EditorModule } from './editor';

@NgModule({
  imports: [
    SystemModule,
    FileModule,
    EditorModule,
  ],
})
export class ResourcesModule { }
