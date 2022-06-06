// Angular
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';



// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';

// Carousel Component
import { CarouselModule } from 'ngx-bootstrap/carousel';

// Collapse Component
import { CollapseModule } from 'ngx-bootstrap/collapse';

// Dropdowns Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Pagination Component
import { PaginationModule } from 'ngx-bootstrap/pagination';

// Popover Component
import { PopoverModule } from 'ngx-bootstrap/popover';

// Progress Component
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

// Tooltip Component
import { TooltipModule } from 'ngx-bootstrap/tooltip';

// navbars
import { NavbarsComponent } from './navbars/navbars.component';

// Components Routing
import { BaseRoutingModule } from './base-routing.module';

import { AddUpdateProductComponent } from './product/add-update-product/add-update-product.component';
import { CustomerComponent } from './customer/customer.component';
import { CategoryComponent } from './category/category.component';
import { AddUpdateCategoryComponent } from './category/add-update-category/add-update-category.component';
import { StaffComponent } from './staff/staff.component';
import { AddUpdateStaffComponent } from './staff/add-update-staff/add-update-staff.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Ng2CompleterModule } from 'ng2-completer';
import { NgxSpinnerModule } from "ngx-spinner";
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { PopUpDetailComponent } from './product/pop-up-detail/pop-up-detail.component';
import { OrdersPendingComponent } from './orders-pending/orders-pending.component';
import { OrdersSuccessComponent } from './orders-success/orders-success.component';
import { OrdersWaitingCancleComponent } from './orders-waiting-cancle/orders-waiting-cancle.component';
import { OrdersWaitingDeliveryComponent } from './orders-waiting-delivery/orders-waiting-delivery.component';
import { OrdersPendingDetailsComponent } from './orders-pending/orders-pending-details/orders-pending-details.component';
import { OrdersWaitingDetailsComponent } from './orders-waiting-cancle/orders-waiting-details/orders-waiting-details.component';
import { VouchersComponent } from './vouchers/vouchers.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BaseRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule,
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    PaginationModule.forRoot(),
    PopoverModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    ReactiveFormsModule,
    Ng2SmartTableModule,
    NgxSpinnerModule,
  ],
  declarations: [
    NavbarsComponent,
    CustomerComponent,
    CategoryComponent,
    AddUpdateCategoryComponent,
    StaffComponent,
    AddUpdateStaffComponent,
    ProductDetailComponent,
    ProductDetailComponent,
    PopUpDetailComponent,
    OrdersPendingComponent,
    OrdersSuccessComponent,
    OrdersWaitingCancleComponent,
    OrdersWaitingDeliveryComponent,
    OrdersPendingDetailsComponent,
    OrdersWaitingDetailsComponent,
    VouchersComponent,
  ],
})
export class BaseModule { }
