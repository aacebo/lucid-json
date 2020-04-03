import { NgModule } from '@angular/core';

import { SystemModule } from './system';
import { FileModule } from './file';

@NgModule({
  imports: [
    SystemModule,
    FileModule,
  ],
})
export class ResourcesModule { }
