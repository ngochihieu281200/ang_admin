import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  LocationStrategy,
  HashLocationStrategy,
  DatePipe,
  PathLocationStrategy,
} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BaseRoutingModule } from './views/base/base-routing.module';
import { BaseModule } from './views/base/base.module';
import '@popperjs/core';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  IconModule,
  IconSetModule,
  IconSetService,
} from '@coreui/icons-angular';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Ng2CompleterModule } from 'ng2-completer';
import { NgxSpinnerModule } from "ngx-spinner";

const APP_CONTAINERS = [DefaultLayoutComponent];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { AddUpdateProductComponent } from './views/base/product/add-update-product/add-update-product.component';
import { ProductComponent } from './views/base/product/product.component';
import { OrdersPendingComponent } from './views/base/orders-pending/orders-pending.component';
import { OrdersSuccessComponent } from './views/base/orders-success/orders-success.component';
import { OrdersWaitingCancleComponent } from './views/base/orders-waiting-cancle/orders-waiting-cancle.component';
import { OrdersWaitingDeliveryComponent } from './views/base/orders-waiting-delivery/orders-waiting-delivery.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    IconModule,
    IconSetModule.forRoot(),
    HttpClientModule,
    FormsModule,
    BaseModule,
    ReactiveFormsModule,
    BaseRoutingModule,
    Ng2SearchPipeModule,
    Ng2SmartTableModule,
    Ng2CompleterModule,
    ModalModule,
    ToastrModule.forRoot(),
    CommonModule,
    NgxSpinnerModule,
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    ProductComponent,
    AddUpdateProductComponent,
    P500Component,
    LoginComponent,
    RegisterComponent,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    IconSetService,
    BsModalService,
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
