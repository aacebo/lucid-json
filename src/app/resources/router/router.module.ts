import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

@NgModule({
  imports: [
    StoreModule.forFeature('router', routerReducer),
    StoreRouterConnectingModule.forRoot(),
  ],
})
export class RouterModule { }
