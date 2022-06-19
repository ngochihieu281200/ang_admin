import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { OrderService } from 'src/app/services/order.service';
import { RefreshTokenService } from 'src/app/services/refresh-token.service';
@Component({
  selector: 'app-orders-success-details',
  templateUrl: './orders-success-details.component.html',
  styleUrls: ['./orders-success-details.component.scss']
})
export class OrdersSuccessDetailsComponent implements OnInit {
  id;
  orderDetail;
  totalPrice = 0;
  dateOrder;
  constructor(private orderService: OrderService,
    private refreshTokenService: RefreshTokenService,
    private route: ActivatedRoute,
    private datepipe: DatePipe,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.id = this.route.snapshot.params.id;
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    this.orderService.GetDetailOrder(this.id).subscribe(
      {
        next: (res: any) => {
          this.orderDetail = res.Data;
          this.dateOrder = this.datepipe.transform(this.orderDetail.CreatedByTime, 'dd/MM/yyyy')
          this.orderDetail.OrderDetails.forEach(item => {
            this.totalPrice += item.Price * item.Count
          })
          this.spinner.hide();
        },
        error: async (err) => {
          if (err.status === 401) {
            this.refreshTokenService.refreshToken()
              .subscribe((res) => {
                tokenStorage.AccessToken = res['Data'].AccessToken;
                localStorage.setItem('token', JSON.stringify(tokenStorage));
                this.orderService.GetDetailOrder(this.id).subscribe(
                  (res: any) => {
                    this.spinner.hide();
                  }
                )
              });
          }
        }
      }

    )

  }

}
