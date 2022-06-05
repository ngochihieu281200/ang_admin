import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { OrderService } from 'src/app/services/order.service';
import { RefreshTokenService } from 'src/app/services/refresh-token.service';

@Component({
  selector: 'app-orders-waiting-details',
  templateUrl: './orders-waiting-details.component.html',
  styleUrls: ['./orders-waiting-details.component.scss']
})
export class OrdersWaitingDetailsComponent implements OnInit {

  id;
  orderDetail;
  formOrder: FormGroup;
  totalPrice = 0;
  dateOrder;

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
        console.log(this.orderDetail);
      }
    )
  }

  onSubmit() {

  }

}
