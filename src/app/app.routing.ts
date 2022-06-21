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
import { AddUpdateStaffComponent } from './views/base/staff/add-update-staff/add-update-staff.component';
import { OrdersPendingComponent } from './views/base/orders-pending/orders-pending.component';
import { OrdersWaitingDeliveryComponent } from './views/base/orders-waiting-delivery/orders-waiting-delivery.component';
import { OrdersWaitingCancleComponent } from './views/base/orders-waiting-cancle/orders-waiting-cancle.component';
import { OrdersSuccessComponent } from './views/base/orders-success/orders-success.component';
import { OrdersPendingDetailsComponent } from './views/base/orders-pending/orders-pending-details/orders-pending-details.component';
import { OrdersWaitingDetailsComponent } from './views/base/orders-waiting-cancle/orders-waiting-details/orders-waiting-details.component';
import { VouchersComponent } from './views/base/vouchers/vouchers.component';
import { AddUpdateVoucherComponent } from './views/base/vouchers/add-update-voucher/add-update-voucher.component';
import { BannerComponent } from './views/base/banner/banner.component';
import { AddUpdateBannerComponent } from './views/base/banner/add-update-banner/add-update-banner.component';
import { NewsComponent } from './views/base/news/news.component';
import { AddUpdateNewsComponent } from './views/base/news/add-update-news/add-update-news.component';
import { OrdersWaitingDeleveryDetailsComponent } from './views/base/orders-waiting-delivery/orders-waiting-delevery-details/orders-waiting-delevery-details.component';
import { OrdersSuccessDetailsComponent } from './views/base/orders-success/orders-success-details/orders-success-details.component';
import { Role } from './model/role.model';

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
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin, Role.Staff] }
      },
      {
        path: 'base',
        loadChildren: () => import('./views/base/base-routing.module').then(m => m.BaseRoutingModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'product',
        component: ProductComponent,
        data: { roles: [Role.Admin] },
        canActivate: [AuthGuard],
        children: [
          {
            path: 'product/:id',
            component: AddUpdateProductComponent,
            canActivate: [AuthGuard],
          }
        ]

      },
      {
        path: 'product/:id',
        data: { roles: [Role.Admin] },
        component: AddUpdateProductComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'product-detail/:id',
        component: ProductDetailComponent,
        data: { roles: [Role.Admin] },
        canActivate: [AuthGuard],
      },
      {
        path: 'voucher',
        data: { roles: [Role.Admin] },
        component: VouchersComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'voucher/:id',
        data: { roles: [Role.Admin] },
        component: AddUpdateVoucherComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'banner',
        data: { roles: [Role.Admin, Role.Staff] },
        component: BannerComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'banner/:id',
        data: { roles: [Role.Admin, Role.Staff] },
        component: AddUpdateBannerComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'news',
        data: { roles: [Role.Admin, Role.Staff] },
        component: NewsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'news/:id',
        data: { roles: [Role.Admin, Role.Staff] },
        component: AddUpdateNewsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'category',
        component: CategoryComponent,
        data: { roles: [Role.Admin] },
        canActivate: [AuthGuard],
      },
      {
        path: 'category/:id',
        component: AddUpdateCategoryComponent,
        data: { roles: [Role.Admin] },
        canActivate: [AuthGuard],
      },
      {
        path: 'staff',
        component: StaffComponent,
        data: { roles: [Role.Admin] },
        canActivate: [AuthGuard],
      },
      {
        path: 'staff/id',
        component: AddUpdateStaffComponent,
        data: { roles: [Role.Admin] },
        canActivate: [AuthGuard],
      },
      {
        path: 'order/pending',
        data: { roles: [Role.Admin, Role.Staff] },
        component: OrdersPendingComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'order/pending/:id',
        data: { roles: [Role.Admin, Role.Staff] },
        component: OrdersPendingDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'order/delivery',
        data: { roles: [Role.Admin, Role.Staff] },
        component: OrdersWaitingDeliveryComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'order/delivery/id',
        data: { roles: [Role.Admin, Role.Staff] },
        component: OrdersWaitingDeleveryDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'order/cancle',
        data: { roles: [Role.Admin, Role.Staff] },
        component: OrdersWaitingCancleComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'order/cancle/:id',
        data: { roles: [Role.Admin, Role.Staff] },
        component: OrdersWaitingDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'order/success',
        data: { roles: [Role.Admin, Role.Staff] },
        component: OrdersSuccessComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'order/success/id',
        data: { roles: [Role.Admin, Role.Staff] },
        component: OrdersSuccessDetailsComponent,
        canActivate: [AuthGuard],
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
