import { NgModule } from '@angular/core';

import { SystemModule } from './system';
import { RouterModule } from './router';

@NgModule({
  imports: [
    SystemModule,
    RouterModule,
  ],
})
export class ResourcesModule { }
