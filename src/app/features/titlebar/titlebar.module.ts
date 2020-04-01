import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TitlebarComponent } from './titlebar.component';

@NgModule({
  declarations: [TitlebarComponent],
  exports: [TitlebarComponent],
  imports: [CommonModule],
})
export class TitlebarModule { }
