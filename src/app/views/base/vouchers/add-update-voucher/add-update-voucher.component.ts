import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { VoucherService } from './../../../../services/voucher.service';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RefreshTokenService } from 'src/app/services/refresh-token.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-update-voucher',
  templateUrl: './add-update-voucher.component.html',
  styleUrls: ['./add-update-voucher.component.scss']
})
export class AddUpdateVoucherComponent implements OnInit {

  constructor(private voucherService: VoucherService,
    private refreshTokenService: RefreshTokenService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }


  id;
  editMode;
  formVoucher;
  ImageVoucher;
  voucherCreate;
  fromDate;
  toDate;
  isDicount = false;
  voucherUpdate;
  ckeConfig;
  type = false;
  ngOnInit(): void {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));

    this.id = this.route.snapshot.params.id;
    this.id = this.route.snapshot.params.id;
    if (this.id == "id") {
      this.editMode = false;
    } else this.editMode = true;

    if (this.editMode) {
      this.spinner.show();
      this.voucherService.GetDetailVoucher(this.id).subscribe(
        {
          next: (res: any) => {
            this.formVoucher.patchValue(res.Data);
            this.ImageVoucher = res.Data.ImageVoucher;
            if (res.Data.DisCountAmount > 0) {
              this.isDicount = true;
            }
            if (res.Data.Type == "DELIVERY") {
              this.type = true;
            }
            this.fromDate = res.Data.FromDate;
            this.toDate = res.Data.ToDate;
            this.spinner.hide();
          },
          error: async (err) => {
            if (err.status === 401) {
              this.refreshTokenService.refreshToken()
                .subscribe((res) => {
                  tokenStorage.AccessToken = res['Data'].AccessToken;
                  localStorage.setItem('token', JSON.stringify(tokenStorage));
                  this.voucherService.GetDetailVoucher(this.id).subscribe(
                    (res: any) => {
                      this.formVoucher.patchValue(res.Data);
                      this.ImageVoucher = res.Data.ImageVoucher;
                      if (res.Data.DisCountAmount > 0) {
                        this.isDicount = true;
                      }
                      this.fromDate = res.Data.FromDate;
                      this.toDate = res.Data.ToDate;
                      this.spinner.hide();

                    }
                  )
                });
            }
          }
        }
      )
    }

    this.formVoucher = new FormGroup({
      Id: new FormControl(),
      Title: new FormControl('', Validators.required),
      FromDate: new FormControl('', Validators.required),
      ToDate: new FormControl('', Validators.required),
      DisCountPercent: new FormControl(0, [Validators.required, Validators.max(100), Validators.min(0)]),
      DisCountAmount: new FormControl(0, [Validators.required, Validators.min(0)]),
      LimitDisCountAmout: new FormControl('', Validators.required),
      FromCondition: new FormControl('', Validators.required),
      ToCondition: new FormControl('', Validators.required),
      Description: new FormControl('', Validators.required),
      Type: new FormControl('', Validators.required),
      IsShow: new FormControl('', Validators.required),
    })

    this.ckeConfig = {
      extraPlugins: 'uploadimage,justify',
      uploadUrl:
        'https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json',

      // Configure your file manager integration. This example uses CKFinder 3 for PHP.
      filebrowserBrowseUrl:
        'https://ckeditor.com/apps/ckfinder/3.4.5/ckfinder.html',
      filebrowserImageBrowseUrl:
        'https://ckeditor.com/apps/ckfinder/3.4.5/ckfinder.html?type=Images',
      filebrowserUploadUrl:
        'https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files',
      filebrowserImageUploadUrl:
        'https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Images',
      image2_alignClasses: ['align-left', 'align-center', 'align-right'],
    };

  }

  onChange(deviceValue) {
    if (deviceValue == "true") {
      this.isDicount = true;

    }
    else {
      this.isDicount = false;
    }

    this.formVoucher.controls['DisCountPercent'].setValue(0);
    this.formVoucher.controls['DisCountAmount'].setValue(0);
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  onSubmit() {
    if (this.formVoucher.invalid) {
      this.validateAllFormFields(this.formVoucher);
      this.toastr.error("Dữ liệu không được để trống", "Thông báo lỗi");
      return;
    }

    if (this.editMode) {
      this.updateVoucher();
    }
    else {
      this.addVoucher();
    }
  }

  addVoucher() {
    delete this.formVoucher.value.Id;
    this.voucherCreate = this.formVoucher.value;
    if (this.formVoucher.value.IsShow) {
      this.voucherCreate.IsShow = 1;
    }
    else {
      this.voucherCreate.IsShow = 0;
    }
    this.spinner.show();
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    this.voucherService.AddVoucher(this.voucherCreate).subscribe({
      next: (res: any) => {
        this.toastr.success(res.Message, 'Thông báo');
        this.spinner.hide();
      },
      error: async (error) => {
        if (error.status === 401) {
          this.refreshTokenService.refreshToken()
            .subscribe((res) => {
              tokenStorage.AccessToken = res['Data'].AccessToken;
              localStorage.setItem('token', JSON.stringify(tokenStorage));
              this.voucherService.AddVoucher(this.voucherCreate).subscribe({
                next: (res: any) => {
                  this.toastr.success(res.Message, 'Thông báo');
                  this.spinner.hide();
                  this.formVoucher.reset();
                },
                error: (error) => {
                  this.toastr.error(error.error.Message, 'Thông báo lỗi');
                  this.spinner.hide();
                }
              })
            });
        }
        else { this.toastr.error(error.error.Message, 'Thông báo lỗi'); this.spinner.hide(); }
      },
    })
  }

  updateVoucher() {
    this.voucherUpdate = this.formVoucher.value;
    var fromDate = new Date(this.formVoucher.value.FromDate);
    var toDate = new Date(this.formVoucher.value.ToDate);

    this.voucherUpdate.FromDate = fromDate;
    this.voucherUpdate.ToDate = toDate;

    if (this.formVoucher.value.IsShow) {
      this.voucherUpdate.IsShow = 1;
    }
    else {
      this.voucherUpdate.IsShow = 0;
    }
    console.log(this.voucherUpdate);

    this.spinner.show();
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    this.voucherService.UpdateVoucher(this.voucherUpdate).subscribe({
      next: (res: any) => {
        this.toastr.success(res.Message, 'Thông báo');
        this.spinner.hide();
      },
      error: async (error) => {
        if (error.status === 401) {
          this.refreshTokenService.refreshToken()
            .subscribe((res) => {
              tokenStorage.AccessToken = res['Data'].AccessToken;
              localStorage.setItem('token', JSON.stringify(tokenStorage));
              this.voucherService.UpdateVoucher(this.voucherUpdate).subscribe({
                next: (res: any) => {
                  this.toastr.success(res.Message, 'Thông báo');
                  this.spinner.hide();
                },
                error: (error) => {
                  this.toastr.error(error.error.Message, 'Thông báo lỗi');
                  this.spinner.hide();
                }
              })
            });
        }
        else { this.toastr.error(error.error.Message, 'Thông báo lỗi'); this.spinner.hide(); }
      },
    })
  }
}
