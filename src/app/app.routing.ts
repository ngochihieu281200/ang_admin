import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate as canActivate } from '@angular/router';
// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { AuthGuard } from './shared/auth.guard';
import { ProductComponent } from './views/base/product/product.component';
import { AddUpdateProductComponent } from './views/base/product/add-update-product/add-update-product.component';
import { ProductDetailComponent } from './views/base/product/product-detail/product-detail.component';
import { StaffComponent } from './views/base/staff/staff.component';
import { AddUpdateCategoryComponent } from './views/base/category/add-update-category/add-update-category.component';
import { CategoryComponent } from './views/base/category/category.component';
import { CustomerComponent } from './views/base/customer/customer.component';
import { AddUpdateStaffComponent } from './views/base/staff/add-update-staff/add-update-staff.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'base',
        loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'product',
        component: ProductComponent,
        data: {
          title: 'Product'
        },
        canActivate: [AuthGuard]
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
          title: 'Category',
        },
      },
      {
        path: 'category/:id',
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
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
