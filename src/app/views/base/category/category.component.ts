import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { apiEndpoint } from 'src/app/config/api';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { data } from './../../../model/user.model';
import { CategoryService } from './../../../services/category.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from "ngx-spinner";
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
          class="btn btn-outline-success"
          (click)="onPopUp()"
        >
          Xác Nhận
        </button>
        <button
          type="button"
          class="btn btn-outline-danger"
          (click)="modal.close('Không')"
        >
          Không Xác Nhận
        </button>
      </div>
    </ng-template>
    <ngx-spinner bdColor="rgba(0, 0, 0, 0.8)" size="medium" color="#fff" type="square-jelly-box" [fullScreen] ="true"><p style="color: white" > Đợi trong giây lát... </p></ngx-spinner>`,
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  [x: string]: any;
  idCategory;
  @Input() id: string;
  @ViewChild('content') public content: ModalDirective;

  ngOnInit() {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    this.spinner.show();
    this.categoryService.getAll().subscribe(
      (res: any) => {
        this.spinner.hide();
        this.source.load(res?.Data);
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

      ImageCategory: {
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
          return `<p>Tạo bởi : ${cell.CreatedByName
            }<br>Lúc: ${this.datepipe.transform(
              cell.CreatedByTime,
              'dd/mm/yyyy'
            )}<br>
          Cập nhật bởi: ${cell.UpdatedByName
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
    private categoryService: CategoryService,
    private httpClient: HttpClient,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) { }
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
  async onPopUp() {
    this.modalReference.close();
    this.spinner.show();
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    (await this.categoryService.delete(this.idCategory)).subscribe(
      (res: any) => {
        this.categoryService.getAll().subscribe((res: any) => {
          this.spinner.hide();
          this.source.load(res?.Data);
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
              this.categoryService.getAll().subscribe((res: any) => {
                this.spinner.hide();
                this.source.load(res?.Data);
              });
            });
        }
      }
    );
  }
  source: LocalDataSource = new LocalDataSource();
  addCategory() {
    (<any>this.router).navigate([`/category/id`]);
    // console.log(this.addStaff);
  }
  editCategory(data) {
    (<any>this.router).navigate([`/category/${data.Id}`]);
    console.log(this.editCategory);
  }
  deleteCategory(data) {
    this.idCategory = data.Id;
    this.modalReference = this.modalService.open(this.content);
    this.modalReference.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  selectProduct(data) {
    // (<any>this.router).navigate([`/base/product-detail/${data.Id}`]);
    // console.log(this.selectProduct);
  }
}
