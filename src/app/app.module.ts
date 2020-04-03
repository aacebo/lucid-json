import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { UniIconModule, UniIconService } from '@uniform/components';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { ResourcesModule } from './resources/resources.module';

import { TitlebarModule } from './features/titlebar';
import { ActionbarModule } from './features/actionbar';
import { FilesTabGroupModule } from './features/files-tab-group';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,

    EffectsModule.forRoot([ ]),
    StoreModule.forRoot({ }),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
      maxAge: 100,
    }),

    ResourcesModule,
    UniIconModule,

    TitlebarModule,
    ActionbarModule,
    FilesTabGroupModule,
  ],
})
export class AppModule {
  constructor(private readonly iconService: UniIconService) {
    this.iconService.registry('mdi');
  }
}
