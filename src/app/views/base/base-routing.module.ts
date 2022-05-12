import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardsComponent } from './cards.component';
import { FormsComponent } from './forms.component';
import { SwitchesComponent } from './switches.component';
import { TablesComponent } from './tables.component';
import { TabsComponent } from './tabs.component';
import { CarouselsComponent } from './carousels.component';
import { CollapsesComponent } from './collapses.component';
import { PaginationsComponent } from './paginations.component';
import { PopoversComponent } from './popovers.component';
import { ProgressComponent } from './progress.component';
import { TooltipsComponent } from './tooltips.component';
import { NavbarsComponent } from './navbars/navbars.component';
import { ProductComponent } from './product/product.component';

import { BrandComponent } from './brand/brand.component';
import { AddUpdateBrandComponent } from './brand/add-update-brand/add-update-brand.component';
import { CustomerComponent } from './customer/customer.component';
import { CategoryComponent } from './category/category.component';
import { AddUpdateCategoryComponent } from './category/add-update-category/add-update-category.component';
import { StaffComponent } from './staff/staff.component';
import { AddUpdateStaffComponent } from './staff/add-update-staff/add-update-staff.component';

import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { AddUpdateProductComponent } from './product/add-update-product/add-update-product.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Base',
    },
    children: [
      {
        path: '',
        redirectTo: 'cards',
      },
      {
        path: 'cards',
        component: CardsComponent,
        data: {
          title: 'Cards',
        },
      },
      {
        path: 'forms',
        component: FormsComponent,
        data: {
          title: 'Forms',
        },
      },
      {
        path: 'switches',
        component: SwitchesComponent,
        data: {
          title: 'Switches',
        },
      },
      {
        path: 'tables',
        component: TablesComponent,
        data: {
          title: 'Tables',
        },
      },
      {
        path: 'tabs',
        component: TabsComponent,
        data: {
          title: 'Tabs',
        },
      },
      {
        path: 'carousels',
        component: CarouselsComponent,
        data: {
          title: 'Carousels',
        },
      },
      {
        path: 'collapses',
        component: CollapsesComponent,
        data: {
          title: 'Collapses',
        },
      },
      {
        path: 'paginations',
        component: PaginationsComponent,
        data: {
          title: 'Pagination',
        },
      },
      {
        path: 'popovers',
        component: PopoversComponent,
        data: {
          title: 'Popover',
        },
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data: {
          title: 'Progress',
        },
      },
      {
        path: 'tooltips',
        component: TooltipsComponent,
        data: {
          title: 'Tooltips',
        },
      },
      {
        path: 'navbars',
        component: NavbarsComponent,
        data: {
          title: 'Navbars',
        },
      },
      {
        path: 'product',
        component: ProductComponent,
        data: {
          title: 'Product',
        },
      },
      {
        path: 'product/:id',
        component: AddUpdateProductComponent,
        data: {
          title: 'id',
        },
      },
      {
        path: 'product-detail/:id',
        component: ProductDetailComponent,
        data: {
          title: 'Product-Detail',
        },
      },

      {
        path: 'brand',
        component: BrandComponent,
        data: {
          title: 'Brand',
        },
      },
      {
        path: 'brand/id',
        component: AddUpdateBrandComponent,
        data: {
          title: 'id',
        },
      },
      {
        path: 'customer',
        component: CustomerComponent,
        data: {
          title: 'Customer',
        },
      },
      {
        path: 'category',
        component: CategoryComponent,
        data: {
          title: 'Brand',
        },
      },
      {
        path: 'category/id',
        component: AddUpdateCategoryComponent,
        data: {
          title: 'id',
        },
      },
      {
        path: 'staff',
        component: StaffComponent,
        data: {
          title: 'Staff',
        },
      },
      {
        path: 'staff/id',
        component: AddUpdateStaffComponent,
        data: {
          title: 'id',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule],
})
export class BaseRoutingModule { }
