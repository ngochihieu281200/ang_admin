import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ProductInfo } from 'src/app/model/product.model';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { apiEndpoint } from 'src/app/config/api';
import { HttpClient } from '@angular/common/http';
import { async } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import { CategoryComponent } from './../category/category.component';
// import value from './../../../../declarations.d';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';
import { data } from './../../../model/user.model';
import { ModalsComponent } from './../../notifications/modals.component';
// import { PopUpDetailComponent } from './pop-up-detail/pop-up-detail.component';

// const routes: Routes = [
//   { path: '', redirectTo: '/AppComponent', pathMatch: 'full' },
//   { path: 'role', component: RoleComponent },
// ];

@Component({
  selector: 'app-product',
  // templateUrl: './product.component.html',
  template: `<ng2-smart-table
    [settings]="settings"
    [source]="source"
    (create)="addProduct()"
    (edit)="editProduct($event)"
    (delete)="deleteProduct($event)"
    (userRowSelect)="selectProduct($event)"
  ></ng2-smart-table>`,
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  [x: string]: any;
  datas;
  detail;
  searchText;
  keyword;
  hide;

  @Input() id: string;

  // @ViewChild(PopUpDetailComponent) infoModal: PopUpDetailComponent;
  // playerName: string;

  constructor(
    private productService: ProductService,
    private httpClient: HttpClient,
    private router: Router
  ) {}

  selectProduct(data) {
    // console.log(this.infoModal.showInfoModal());

    (<any>this.router).navigate([`/base/product-detail/${data.data.Id}`]);
  }

  addProduct() {
    console.log('add product', this.addProduct);

    // routes.navigate(['/role']);
    (<any>this.router).navigate([`/base/product/id`]);
  }

  editProduct(data) {
    console.log('edit', data.data.Id);
    (<any>this.router).navigate([`/base/product/${data.data.Id}`]);
  }

  deleteProduct(data) {
    console.log('delete', data.data.Id);
    this.largeModal.show();
    // const demo = document.querySelector('#demoModal');
    // console.log('demo', demo);
    // console.log('this.myModal', this.myModal);
    // this.myModal.show();
    // this.largeModal.show();
    // (<any>this.router).navigate([`/base/product`]);
  }

  settings = {
    mode: 'external',
    columns: {
      Id: {
        title: 'Mã Sản phẩm',
        type: 'string',
      },
      Name: {
        title: 'Tên Sản phẩm',
        type: 'string',
      },
      CategoryName: {
        title: 'Danh mục Sản phẩm',
        type: 'string',
      },
      BrandName: {
        title: 'Nhãn Hiệu Sản phẩm',
        type: 'string',
      },
      Thumbnail: {
        title: 'Hình Ảnh',
        type: 'html',
        valuePrepareFunction: (value) => {
          return `<img src =  "${value}" width="100px">`;
        },
      },
      FromPrice: {
        title: 'Giá Sản phẩm',
        type: 'string',
      },
      // thaotac: {
      //   title: 'Thao Tác',
      //   type: 'string',
      // },
      hethong: {
        title: 'Hệ Thống',
        type: 'html',
        valuePrepareFunction: (value, cell, row) => {
          return `<p>${cell.CreatedByName}<br>${cell.CreatedByTime}<br>${cell.UpdatedByName}<br>${cell.UpdatedByTime}</p>`;
        },
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  ngOnInit() {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    // this.productService.RetrieveAll().subscribe((res: any) => {
    //   this.source.load(res.Data.ListProduct);
    // });
    // this.productService.RetrieveAll().subscribe((res: any) => {
    //   this.source.load(res?.Data.ListProduct);
    //   this.datas = res?.Data.ListProduct;
    // });
    this.productService.RetrieveAll().subscribe(
      (res: any) => {
        // this.source.load(res['Data'].ListProduct),
        // (this.datas = res['Data'].ListProduct),
        // console.log('data', this.datas)
        this.source.load(res?.Data.ListProduct);
        console.log(res?.Data.ListProduct);
      },
      async (err) => {
        if (err.status === 401) {
          await this.httpClient
            .post(`${apiEndpoint}authenticate/refresh-token`, {
              headers: {
                'Content-Type': 'application/json',
              },
              RefreshToken: tokenStorage.RefreshToken,
            })
            .subscribe((res) => {
              // console.log('res', res)
              tokenStorage.AccessToken = res['Data'].AccessToken;
              localStorage.setItem('token', JSON.stringify(tokenStorage));
              // console.log('this.accessToken', this.accessToken)
              this.productService.RetrieveAll();
            });
        }
      }
    );
  }
  // Search() {
  //   // this.productService.Search().subscribe((response:any)=>
  //   // this.product)
  // }
  // async viewDetail(id) {
  //   console.log(this.viewDetail);
  //   this.largeModal.show();
  //   const tokenStorage = JSON.parse(localStorage.getItem('token'));
  //   (await this.productService.callApiWithToken('', id)).subscribe(
  //     (res: any) => ((this.detail = res), console.log('res', res)),
  //     async (err) => {
  //       if (err.status === 401) {
  //         await this.httpClient
  //           .post(`${apiEndpoint}authenticate/refresh-token`, {
  //             headers: {
  //               'Content-Type': 'application/json',
  //             },
  //             RefreshToken: tokenStorage.RefreshToken,
  //           })
  //           .subscribe((res) => {
  //             // console.log('res', res)
  //             tokenStorage.AccessToken = res['Data'].AccessToken;
  //             localStorage.setItem('token', JSON.stringify(tokenStorage));
  //             // console.log('this.accessToken', this.accessToken)
  //             this.productService.callApiWithToken('', id);
  //           });
  //       }
  //     }
  //   );
  // }

  // onDelete(Id: number) {
  //   alert(Id);
  // }

  // onsubmit() {
  //   return this.playerName;
  //   console.log(this.onsubmit);
  // }
  // onSubmit(event: any) {
  //   return event.target.player.value;
  // }
  // onSubmit(playerName: string) {
  //   console.log(

  //   );
  // }
}
