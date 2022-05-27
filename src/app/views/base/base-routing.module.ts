import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavbarsComponent } from './navbars/navbars.component';
import { ProductComponent } from './product/product.component';


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
        path: 'navbars',
        component: NavbarsComponent,
        data: {
          title: 'Navbars',
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
