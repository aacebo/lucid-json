import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { UniIconModule, UniIconService, UniTabModule, UniScrollModule, UniSplitModule, UniJsonTreeModule } from '@uniform/components';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResourcesModule } from './resources/resources.module';

import { TitlebarModule } from './features/titlebar';
import { ActionbarModule } from './features/actionbar';
import { JsonEditorModule } from './features/json-editor';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    EffectsModule.forRoot([ ]),
    StoreModule.forRoot({ }),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
      maxAge: 100,
    }),

    AppRoutingModule,
    ResourcesModule,
    UniIconModule,
    UniTabModule,
    UniScrollModule,
    UniSplitModule,
    UniJsonTreeModule,

    TitlebarModule,
    ActionbarModule,
    JsonEditorModule,
  ],
})
export class AppModule {
  constructor(private readonly iconService: UniIconService) {
    this.iconService.registry('mdi');
  }
}
