import { NgModule } from '@angular/core';

import { SystemModule } from './system';
import { RouterModule } from './router';
import { FileModule } from './file';

@NgModule({
  imports: [
    SystemModule,
    RouterModule,
    FileModule,
  ],
})
export class ResourcesModule { }
