import { Component, OnInit, ViewChild } from '@angular/core';
import { RefreshTokenService } from '../../../services/refresh-token.service';
import { VoucherService } from '../../../services/voucher.service';
import { LocalDataSource } from 'ng2-smart-table';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ReturnStatement } from '@angular/compiler';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDirective } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.scss']
})
export class VouchersComponent implements OnInit {

  constructor(
    private refreshTokenService: RefreshTokenService,
    private router: Router,
    public datepipe: DatePipe,
    private spinner: NgxSpinnerService,
    private voucherService: VoucherService,
    private toastr: ToastrService,
    private modalService: NgbModal) { }
  source: LocalDataSource = new LocalDataSource();
  @ViewChild('content') public content: ModalDirective;
  [x: string]: any;
  idVoucher;
  ngOnInit(): void {
    this.spinner.show();
    var tokenStorage = JSON.parse(localStorage.getItem('token'));
    this.voucherService.GetAllVoucher().subscribe(
      (res: any) => {
        this.source.load(res?.Data);
        this.spinner.hide();
      },
      async (err) => {
        if (err.status === 401) {
          this.refreshTokenService.refreshToken()
            .subscribe((res) => {
              tokenStorage.AccessToken = res.Data.AccessToken;
              localStorage.setItem('token', JSON.stringify(tokenStorage));
              this.voucherService.GetAllVoucher().subscribe(
                (res: any) => {
                  this.source.load(res.Data),
                    this.spinner.hide();
                })
            });
        }
      }
    );
  }


  onCuston(event) {
    switch (event.action) {
      case 'editVoucher':
        (<any>this.router).navigate([`voucher/${event.data.Id}`]);
        break;
      case 'deleteVoucher':
        this.deleteVoucher(event.data);
        break;
    }

  }

  onConfirm() {
    this.modalReference.close();
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    this.spinner.show();
    this.voucherService.DeleteVoucher(this.idVoucher).subscribe(
      (res: any) => {
        this.voucherService.GetAllVoucher().subscribe((res: any) => {
          this.source.load(res.Data);
          this.spinner.hide();
        });
        this.toastr.success(res.Message, 'Thông báo');

      },
      async (err) => {
        if (err.status === 401) {
          this.refreshTokenService.refreshToken()
            .subscribe((res) => {
              tokenStorage.AccessToken = res['Data'].AccessToken;
              localStorage.setItem('token', JSON.stringify(tokenStorage));
              this.voucherService.GetAllVoucher().subscribe((res: any) => {
                this.source.load(res.Data);
                this.spinner.hide();
              });
            });

        }
        else {
          console.log(err.error.Message);
          this.toastr.error(err.error.Message, "Thông báo lỗi");
          this.spinner.hide();
        }
      }
    )
  }
  deleteVoucher(data) {
    this.idVoucher = data.Id;
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
  addVoucher() {
    (<any>this.router).navigate([`voucher/id`]);
  }

  settings = {
    mode: 'external',
    pager: {
      perPage: 4,
      display: true,
    },
    actions: {
      custom: [
        {
          name: 'editVoucher',
          title: '<i class="fa fa-edit icon-edit" title="Edit"></i>',
        },
        {
          name: 'deleteVoucher',
          title: '<i class="fa fa-trash icon-delete" title="Delete"></i>',
        },
      ],
      edit: false,
      delete: false,
      position: 'right',
    },
    columns: {
      Id: {
        title: 'Mã Voucher',
        type: 'string',
      },
      Title: {
        title: 'Tiêu đề',
        type: 'string',
      },
      Type: {
        title: 'Loại',
        type: 'string',
      },
      TimeAplly: {
        title: 'Thời Gian Áp Dụng',
        type: 'html',
        valuePrepareFunction: (value, cell, row) => {
          return `<br><p>Ngày Bắt Đầu : ${this.datepipe.transform(cell.FromDate, 'dd/MM/yyyy')
            }<br>Ngày Kết Thúc: ${this.datepipe.transform(cell.ToDate, 'dd/MM/yyyy')}`;
        },
      },
      ImageVoucher: {
        title: 'Hình Ảnh',
        type: 'html',
        valuePrepareFunction: (value, cell, row) => {
          if (cell.Type == "DELIVERY") {
            return `<div class ="bg-warning text-center p-1">
            <img src="${value}" width="100px">
            <p class="m-1">${cell.Title}</p>
          </div>`
          }
          return `<div class ="bg-success text-center p-1">
          <img src="${value}" width="100px">
          <p class="m-1">${cell.Title}</p>
        </div>`
        }
      },
      IsShow: {
        title: 'Trạng Thái',
        type: 'html',
        valuePrepareFunction: (value, cell, row) => {
          if (cell.IsShow == 0) {
            return `<div class="d-flex justify-content-center">
            <p class="w-50 rounded text-light bg-warning text-center">INACTIVE</p>
            </div>`;
          }
          else {
            return `<div class="d-flex justify-content-center">
            <p class="w-50 rounded text-light bg-success text-center">ACTIVE</p>
            </div>`;
          }

        },
      },
    },
  };
}
