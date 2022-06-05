import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { RefreshTokenService } from '../../../services/refresh-token.service';
import { LocalDataSource } from 'ng2-smart-table';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  [x: string]: any;
  datas;
  detail;
  Count: any[];
  pageIndex;
  pageSize;
  keyword;
  hide;
  idProduct;
  @Input() id: string;
  @ViewChild('content') public content: ModalDirective;

  // @ViewChild(PopUpDetailComponent) infoModal: PopUpDetailComponent;
  // playerName: string;

  constructor(
    private productService: ProductService,
    private refreshTokenService: RefreshTokenService,
    private router: Router,
    public datepipe: DatePipe,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  onCuston(event) {
    switch (event.action) {
      case 'editProduct':
        this.editProduct(event.data);
        break;
      case 'deleteProduct':
        this.deleteProduct(event.data);
        break;
      case 'detailProduct':
        this.selectProduct(event.data);
        break;
    }
  }

  settings = {
    mode: 'external',
    pager: {
      perPage: 5,
      display: true,
    },
    actions: {
      custom: [
        {
          name: 'editProduct',
          title: '<i class="fa fa-edit icon-edit" title="Edit"></i>',
        },
        {
          name: 'deleteProduct',
          title: '<i class="fa fa-trash icon-delete" title="Delete"></i>',
        },
        {
          name: 'detailProduct',
          title: '<i class="fa fa-eye icon-detail" title="Detail"></i>',
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
      CategoryName: {
        title: 'Danh Mục Sản Phẩm',
        type: 'string',
      },
      BrandName: {
        title: 'Nhãn Hiệu Sản Phẩm',
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
          return `<p>Tạo bởi : ${cell.CreatedByName
            }<br>Lúc: ${this.datepipe.transform(
              cell.CreatedByTime,
              'dd/MM/yyyy'
            )}<br>
          Cập nhật bởi: ${cell.UpdatedByName
            }<br>Lúc:  ${this.datepipe.transform(
              cell.UpdatedByTime,
              'dd/MM/yyyy'
            )}</p>`;
        },
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  ngOnInit() {
    this.spinner.show();
    var tokenStorage = JSON.parse(localStorage.getItem('token'));
    this.productService.RetrieveAll().subscribe(
      (res: any) => {
        this.source.load(res?.Data.ListProduct);
        this.spinner.hide();
      },
      async (err) => {
        if (err.status === 401) {
          this.refreshTokenService.refreshToken()
            .subscribe((res) => {
              tokenStorage.AccessToken = res.Data.AccessToken;
              localStorage.setItem('token', JSON.stringify(tokenStorage));
              this.productService.RetrieveAll().subscribe(
                (res: any) => {
                  this.source.load(res.Data.ListProduct),
                    this.spinner.hide();
                })
            });
        }
      }
    );

  }

  async onConfirm() {
    this.modalReference.close();
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    (await this.productService.delete(this.idProduct)).subscribe(
      (res: any) => {
        this.productService.RetrieveAll().subscribe((res: any) => {
          this.source.load(res?.Data.ListProduct);
        });
        this.toastr.success(res.Message, 'Thông báo');

      },
      async (err) => {
        if (err.status === 401) {
          this.refreshTokenService.refreshToken()
            .subscribe((res) => {
              tokenStorage.AccessToken = res['Data'].AccessToken;
              localStorage.setItem('token', JSON.stringify(tokenStorage));
              window.location.reload();
              this.productService.RetrieveAll().subscribe((res: any) => {
                this.source.load(res?.Data.ListProduct);
              });
            });

        }
        else {
          this.toastr.error(err.error.Message, "Thông báo lỗi");
        }
      }
    );
  }



  selectProduct(data) {
    (<any>this.router).navigate([`/product-detail/${data.Id}`]);
  }
  addProduct() {
    (<any>this.router).navigate([`/product/id`]);
  }
  editProduct(data) {
    (<any>this.router).navigate([`/product/${data.Id}`]);
  }
  deleteProduct(data) {
    this.idProduct = data.Id;

    this.modelReference = this.modalService.open(this.content);
    this.modalReference.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

}
