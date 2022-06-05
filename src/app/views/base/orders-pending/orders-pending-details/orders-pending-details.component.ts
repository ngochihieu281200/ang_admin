import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { OrderService } from 'src/app/services/order.service';
import { RefreshTokenService } from 'src/app/services/refresh-token.service';

@Component({
  selector: 'app-orders-pending-details',
  templateUrl: './orders-pending-details.component.html',
  styleUrls: ['./orders-pending-details.component.scss']
})
export class OrdersPendingDetailsComponent implements OnInit {

  id;
  orderDetail;
  formOrder: FormGroup;
  totalPrice = 0;
  dateOrder;
  isConfirm = false;

  constructor(private orderService: OrderService,
    private refreshTokenService: RefreshTokenService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private datepipe: DatePipe,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.id = this.route.snapshot.params.id;
    this.orderService.GetDetailOrder(this.id).subscribe(
      (res: any) => {
        this.orderDetail = res.Data;
        this.dateOrder = this.datepipe.transform(this.orderDetail.CreatedByTime, 'dd/MM/yyyy')
        this.orderDetail.OrderDetails.forEach(item => {
          this.totalPrice += item.Price * item.Count
        })
        this.spinner.hide();
      }
    )


    this.formOrder = new FormGroup({
      Id: new FormControl(''),
    })
  }

  onSubmit() {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    this.spinner.show();
    this.orderService.ConfirmOrder(this.id).subscribe({
      next: (res: any) => {
        this.isConfirm = true;
        this.spinner.hide();
        this.toastr.success(res.Message, "Thông báo");
      },
      error: async (err) => {
        if (err.status === 401) {
          this.refreshTokenService.refreshToken()
            .subscribe((res) => {
              tokenStorage.AccessToken = res['Data'].AccessToken;
              localStorage.setItem('token', JSON.stringify(tokenStorage));
              this.orderService.ConfirmOrder(this.id).subscribe(
                (res: any) => {
                  this.isConfirm = true;
                  this.spinner.hide();
                  this.toastr.success(res.Message, "Thông báo");
                }
              )
            });
        }
      },
    }
    )
  }

}
