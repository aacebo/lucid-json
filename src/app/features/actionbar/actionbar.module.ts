import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniIconModule, UniBadgeModule } from '@uniform/components';

import { ActionbarComponent } from './actionbar.component';

@NgModule({
  declarations: [ActionbarComponent],
  exports: [ActionbarComponent],
  imports: [
    CommonModule,

    UniIconModule,
    UniBadgeModule,
  ],
})
export class ActionbarModule { }
