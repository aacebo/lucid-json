import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UniTabModule, UniSplitModule, UniContextMenuModule, UniScrollModule, UniJsonTreeModule, UniIconModule } from '@uniform/components';

import { FilesTabGroupComponent } from './files-tab-group.component';
import { JsonEditorModule } from '../json-editor';

@NgModule({
  declarations: [FilesTabGroupComponent],
  exports: [FilesTabGroupComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    UniTabModule,
    UniSplitModule,
    UniContextMenuModule,
    UniScrollModule,
    UniJsonTreeModule,
    UniIconModule,

    JsonEditorModule,
  ],
})
export class FilesTabGroupModule { }
