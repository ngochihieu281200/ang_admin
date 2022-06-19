import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BannerService } from './../../../../services/banner.service';
import { ProductService } from 'src/app/services/product.service';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RefreshTokenService } from 'src/app/services/refresh-token.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-update-banner',
  templateUrl: './add-update-banner.component.html',
  styleUrls: ['./add-update-banner.component.scss']
})
export class AddUpdateBannerComponent implements OnInit {

  constructor(private bannerService: BannerService,
    private productService: ProductService,
    private refreshTokenService: RefreshTokenService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }


  id;
  editMode;
  formBanner;
  ckeConfig;
  ImageBanner;
  ListProduct;
  bannerCreate;
  bannerUpdate;

  ngOnInit(): void {

    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    this.spinner.show();
    this.id = this.route.snapshot.params.id;

    if (this.id == "id") {
      this.editMode = false;
    } else this.editMode = true;
    this.productService.getAllforBanner().subscribe(
      {
        next: (res: any) => {
          this.ListProduct = res.Data;
          this.spinner.hide();
        },
        error: async (err) => {
          if (err.status === 401) {
            this.refreshTokenService.refreshToken()
              .subscribe((res) => {
                tokenStorage.AccessToken = res['Data'].AccessToken;
                localStorage.setItem('token', JSON.stringify(tokenStorage));
                this.productService.getAllforBanner().subscribe(
                  (res: any) => {
                    this.ListProduct = res.Data;
                    this.spinner.hide();
                  }
                )
              });
          }
        }
      }
    )
    if (this.editMode) {
      this.bannerService.GetDetailBanner(this.id).subscribe(
        {
          next: (res: any) => {
            this.formBanner.patchValue(res.Data);
            this.ImageBanner = res.Data.ImageBanner;
            this.spinner.hide();
          },
          error: async (err) => {
            if (err.status === 401) {
              this.refreshTokenService.refreshToken()
                .subscribe((res) => {
                  tokenStorage.AccessToken = res['Data'].AccessToken;
                  localStorage.setItem('token', JSON.stringify(tokenStorage));
                  this.bannerService.GetDetailBanner(this.id).subscribe(
                    (res: any) => {
                      this.formBanner.patchValue(res.Data);
                      this.ImageBanner = res.Data.ImageBanner;
                      this.spinner.hide();
                    }
                  )
                });
            }
          }
        }
      )
    }

    this.formBanner = new FormGroup({
      Id: new FormControl(),
      IdProduct: new FormControl('', Validators.required),
      Content: new FormControl('', Validators.required),
      IsShowOnMobile: new FormControl('', Validators.required),
    })

    this.ckeConfig = {
      extraPlugins: 'justify,colorbutton',
    };
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
    if (this.formBanner.invalid) {
      this.validateAllFormFields(this.formBanner);
      this.toastr.error("Dữ liệu không được để trống", "Thông báo lỗi");
      return;
    }

    if (this.editMode) {
      this.updateBanner();
    }
    else {
      this.addBanner();
    }
  }

  handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.ImageBanner = reader.result;
    };
  }

  addBanner() {
    delete this.formBanner.value.Id;
    this.bannerCreate = this.formBanner.value;
    this.bannerCreate.ImageBanner = this.ImageBanner;
    if (this.formBanner.value.IsShowOnMobile) {
      this.bannerCreate.IsShowOnMobile = 1;
    }
    else {
      this.bannerCreate.IsShowOnMobile = 0;
    }
    this.spinner.show();
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    this.bannerService.AddBanner(this.bannerCreate).subscribe({
      next: (res: any) => {
        this.toastr.success(res.Message, 'Thông báo');
        this.formBanner.reset();
        this.spinner.hide();
      },
      error: async (error) => {
        if (error.status === 401) {
          this.refreshTokenService.refreshToken()
            .subscribe((res) => {
              tokenStorage.AccessToken = res['Data'].AccessToken;
              localStorage.setItem('token', JSON.stringify(tokenStorage));
              this.bannerService.AddBanner(this.bannerCreate).subscribe({
                next: (res: any) => {
                  this.toastr.success(res.Message, 'Thông báo');
                  this.spinner.hide();
                  this.formBanner.reset();
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

  updateBanner() {

    this.bannerUpdate = this.formBanner.value;
    this.bannerUpdate.ImageBanner = this.ImageBanner;
    if (this.formBanner.value.IsShowOnMobile) {
      this.bannerUpdate.IsShowOnMobile = 1;
    }
    else {
      this.bannerUpdate.IsShowOnMobile = 0;
    }
    this.spinner.show();
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    this.bannerService.UpdateBanner(this.bannerUpdate).subscribe({
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
              this.bannerService.UpdateBanner(this.bannerUpdate).subscribe({
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


