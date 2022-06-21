import { Component, OnInit } from '@angular/core';
import { RefreshTokenService } from '../../../services/refresh-token.service';
import { LocalDataSource } from 'ng2-smart-table';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders-waiting-delivery',
  templateUrl: './orders-waiting-delivery.component.html',
  styleUrls: ['./orders-waiting-delivery.component.scss']
})
export class OrdersWaitingDeliveryComponent implements OnInit {

  constructor(
    private orderService: OrderService,
    private refreshTokenService: RefreshTokenService,
    private router: Router,
    public datepipe: DatePipe,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  source: LocalDataSource = new LocalDataSource();
  ngOnInit(): void {
    this.spinner.show();
    var tokenStorage = JSON.parse(localStorage.getItem('token'));
    this.orderService.GetAllOrderDelivery().subscribe(
      (res: any) => {
        this.source.load(res.Data);
        this.spinner.hide();
      },
      async (err) => {
        if (err.status === 401) {
          this.refreshTokenService.refreshToken()
            .subscribe((res) => {
              tokenStorage.AccessToken = res.Data.AccessToken;
              localStorage.setItem('token', JSON.stringify(tokenStorage));
              this.orderService.GetAllOrderDelivery().subscribe(
                (res: any) => {
                  this.source.load(res.Data.ListProduct),
                    this.spinner.hide();
                })
            });
        }
      }
    )

  }

  onCuston(event) {
    (<any>this.router).navigate([`order/delivery/${event.data.Id}`]);
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
          name: 'confirmProduct',
          title: '<i class="fa fa-edit icon-edit" title="Edit"></i>',
        },
      ],
      edit: false,
      delete: false,
      add: false,
      position: 'right',
    },
    columns: {
      Id: {
        title: 'Mã Đơn Hàng',
        type: 'string',
      },
      UserOrder: {
        title: 'Tên Người Dùng',
        type: 'string',
      },
      AddressReceive: {
        title: 'Địa Chỉ',
        type: 'html',
        valuePrepareFunction: (value, cell, row) => {
          return `<p class ="m-0" >
          ${cell.AddressReceive.Address} ${cell.AddressReceive.Ward} <br>
          ${cell.AddressReceive.District} ${cell.AddressReceive.Province}
          </p>`
        }
      },
      PhoneReceive: {
        title: 'Số Điện Thoại',
        type: 'string',
      },
      Email: {
        title: 'Email',
        type: 'string',
      },
      Status: {
        title: 'Status',
        type: 'html',
        valuePrepareFunction: (value, cell, row) => {
          return `<div class="d-flex justify-content-center">
          <p class="w-50 rounded text-light bg-info text-center">Đang Giao</p>
          </div>`;
        }
      },
      Audit: {
        title: 'Thông Tin Ngày Đặt',
        type: 'html',
        valuePrepareFunction: (value, cell, row) => {
          return `<p>Đặt hàng bởi : ${cell.CreatedByName
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

}
