// Angular
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CardsComponent } from './cards.component';

// Forms Component
import { FormsComponent } from './forms.component';

import { SwitchesComponent } from './switches.component';
import { TablesComponent } from './tables.component';

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TabsComponent } from './tabs.component';

// Carousel Component
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CarouselsComponent } from './carousels.component';

// Collapse Component
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CollapsesComponent } from './collapses.component';

// Dropdowns Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Pagination Component
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PopoversComponent } from './popovers.component';

// Popover Component
import { PopoverModule } from 'ngx-bootstrap/popover';
import { PaginationsComponent } from './paginations.component';

// Progress Component
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ProgressComponent } from './progress.component';

// Tooltip Component
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TooltipsComponent } from './tooltips.component';

// navbars
import { NavbarsComponent } from './navbars/navbars.component';

// Components Routing
import { BaseRoutingModule } from './base-routing.module';
import { ProductComponent } from './product/product.component';

import { AddUpdateProductComponent } from './product/add-update-product/add-update-product.component';
import { BrandComponent } from './brand/brand.component';
import { AddUpdateBrandComponent } from './brand/add-update-brand/add-update-brand.component';
import { CustomerComponent } from './customer/customer.component';
import { CategoryComponent } from './category/category.component';
import { AddUpdateCategoryComponent } from './category/add-update-category/add-update-category.component';
import { StaffComponent } from './staff/staff.component';
import { AddUpdateStaffComponent } from './staff/add-update-staff/add-update-staff.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Ng2CompleterModule } from 'ng2-completer';

import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { PopUpDetailComponent } from './product/pop-up-detail/pop-up-detail.component';

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
    // FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    // Ng2CompleterModule,
  ],
  declarations: [
    CardsComponent,
    FormsComponent,
    SwitchesComponent,
    TablesComponent,
    TabsComponent,
    CarouselsComponent,
    CollapsesComponent,
    PaginationsComponent,
    PopoversComponent,
    ProgressComponent,
    TooltipsComponent,
    NavbarsComponent,
    ProductComponent,
    AddUpdateProductComponent,
    BrandComponent,
    AddUpdateBrandComponent,
    CustomerComponent,
    CategoryComponent,
    AddUpdateCategoryComponent,
    StaffComponent,
    AddUpdateStaffComponent,
    ProductDetailComponent,
    ProductDetailComponent,
    PopUpDetailComponent,
  ],
})
export class BaseModule {}
