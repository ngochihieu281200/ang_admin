import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { apiEndpoint } from 'src/app/config/api';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-category',
  template: `<ng2-smart-table
      [settings]="settings"
      [source]="source"
      (create)="addCategory()"
      (custom)="onCuston($event)"
    ></ng2-smart-table>
    <ng-template #content let-modal>
      <div class="modal-header">
        <h4 class="modal-title" id="modal-basic-title">Xóa Sản Phẩm</h4>
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          (click)="modal.dismiss('Cross click')"
        ></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label for="dateOfBirth">Bạn Có Chắc Muốn Xóa Sản Phẩm</label>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-outline-dark"
          (click)="modal.close('Không')"
        >
          Không Xác Nhận
        </button>

        <button
          type="button"
          class="btn btn-outline-dark"
          (click)="onConfirm()"
        >
          Xác Nhận
        </button>
      </div>
    </ng-template>`,
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  [x: string]: any;
  idProduct;
  ngOnInit() {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));

    this.productService.RetrieveAll().subscribe(
      (res: any) => {
        this.source.load(res?.Data.ListProduct);
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
              tokenStorage.AccessToken = res['Data'].AccessToken;
              localStorage.setItem('token', JSON.stringify(tokenStorage));
              window.location.reload();
            });
        }
      }
    );
  }
  settings = {
    mode: 'external',
    actions: {
      custom: [
        {
          name: 'editCategory',
          title: '<i class="fa fa-edit icon-edit" title="Edit"></i>',
        },
        {
          name: 'deleteCategory',
          title: '<i class="fa fa-trash icon-delete" title="Delete"></i>',
        },
        // {
        //   name: 'detailProduct',
        //   title: '<i class="fa fa-eye icon-detail" title="Detail"></i>',
        // },
      ],
      edit: false,
      delete: false,
      position: 'right',
    },
    columns: {
      Id: {
        title: 'Mã Sản Phẩm',
        type: 'string',
      },
      Name: {
        title: 'Tên Sản Phẩm',
        type: 'string',
      },
      CategoryName: {
        title: 'Danh Mục Sản Phẩm',
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
      hethong: {
        title: 'Hệ Thống',
        type: 'html',
        valuePrepareFunction: (value, cell, row) => {
          return `<p>Tạo bởi : ${
            cell.CreatedByName
          }<br>Lúc: ${this.datepipe.transform(
            cell.CreatedByTime,
            'dd/mm/yyyy'
          )}<br>
          Cập nhật bởi: ${
            cell.UpdatedByName
          }<br>Lúc:  ${this.datepipe.transform(
            cell.UpdatedByTime,
            'dd/mm/yyyy'
          )}</p>`;
        },
      },
    },
  };
  constructor(
    private router: Router,
    private datepipe: DatePipe,
    private productService: ProductService,
    private httpClient: HttpClient,
    private modalService: NgbModal
  ) {}
  onCuston(event) {
    switch (event.action) {
      case 'editCategory':
        this.editCategory(event.data);
        break;
      case 'deleteCategory':
        this.deleteCategory(event.data);
        break;
      // case 'detailProduct':
      //   this.selectProduct(event.data);
      //   break;
    }
  }
  async onConfirm() {
    this.modalReference.close();
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    (await this.productService.delete(this.idProduct)).subscribe(
      (res: any) => {
        this.productService.RetrieveAll().subscribe((res: any) => {
          this.source.load(res?.Data.ListProduct);
        });
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
              tokenStorage.AccessToken = res['Data'].AccessToken;
              localStorage.setItem('token', JSON.stringify(tokenStorage));
              window.location.reload();
            });
        }
      }
    );
  }
  source: LocalDataSource = new LocalDataSource();
  addCategory() {
    (<any>this.router).navigate([`/base/category/id`]);
    // console.log(this.addStaff);
  }
  editCategory(data) {
    (<any>this.router).navigate([`/base/category/id`]);
  }
  deleteCategory(data) {
    this.idProduct = data.Id;
    this.modalReference = this.modalService.open(this.content);
    this.modalReference.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
    console.log(this.deleteCategory);
  }
  selectProduct(data) {
    // (<any>this.router).navigate([`/base/product-detail/${data.Id}`]);
    // console.log(this.selectProduct);
  }
}
