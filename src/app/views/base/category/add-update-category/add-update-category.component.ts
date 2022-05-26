import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { BrandCreate, BrandInfo, CategoryCreate } from 'src/app/model/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { BrandService } from 'src/app/services/brand.service';
import { RefreshTokenService } from 'src/app/services/refresh-token.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-update-category',
  templateUrl: './add-update-category.component.html',
  styleUrls: ['./add-update-category.component.scss'],
})
export class AddUpdateCategoryComponent implements OnInit {

  @ViewChild('largeModal') public largeModal: ModalDirective;
  @ViewChild('content') public content: ModalDirective;
  formCategory: FormGroup;
  formBrand: FormGroup;
  isEditMode: boolean;
  isEditModeBrand: boolean;
  ImageCategory;
  ImageBrand;
  category: any;
  categoryUpdate: any;
  brands: any[];
  brandCreate: any;
  brandUpdate: any;
  id;
  isShow: boolean;
  indexBrand = -1;
  closeResult = '';
  modalReference: any;

  constructor(private refreshTokenService: RefreshTokenService,
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private route: ActivatedRoute,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.isEditMode = this.id;
    if (this.isEditMode) {
      this.categoryService.details(this.id).subscribe(
        (res: any) => {
          this.formCategory.patchValue(res.Data);
          this.ImageCategory = res.Data.ImageCategory;
          this.isEditMode = true;
          this.brandService.getAllByCategoryId(this.id).subscribe(
            (res: any) => {
              this.brands = res.Data;
            }
          )
        }
      )
    }

    this.isEditMode = false;
    this.formCategory = new FormGroup({
      Id: new FormControl(''),
      Name: new FormControl('', Validators.required),
      IsShow: new FormControl('', Validators.required),
    });

    this.formBrand = new FormGroup({
      Id: new FormControl(''),
      Name: new FormControl('', Validators.required),
      IsShow: new FormControl('', Validators.required),
    })
  }
  handleUploadCategory(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.ImageCategory = reader.result;
    };
  }
  handleUploadBrand(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.ImageBrand = reader.result;
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

    if (this.formCategory.invalid) {
      this.validateAllFormFields(this.formCategory);
      this.toastr.error("Dữ liệu không được để trống", "Thông báo lỗi");
      return;
    }

    if (this.isEditMode) {
      this.updateCategory();
    }
    else {
      this.addCategory();
    }
  }


  addCategory() {
    delete this.formCategory.value.Id;
    this.category = this.formCategory.value;
    this.category.ImageCategory = this.ImageCategory;
    if (this.formCategory.value.IsShow) {
      this.category.IsShow = 1;
    }
    else {
      this.category.IsShow = 0;
    }
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    this.categoryService.create(this.category).subscribe(
      {
        next: (res: any) => {
          this.toastr.success(res.Message, 'Thông báo');
        },
        error: (error) => {
          if (error.status === 401) {
            this.refreshTokenService.refreshToken()
              .subscribe((res) => {
                tokenStorage.AccessToken = res['Data'].AccessToken;
                localStorage.setItem('token', JSON.stringify(tokenStorage));
                this.categoryService.create(this.category).subscribe({
                  next: (res: any) => {
                    this.toastr.success(res.Message, 'Thông báo');
                  },
                  error: (error) => {
                    this.toastr.error(error.error.Message, 'Thông báo lỗi');
                  }
                })
              });
          }
          else { this.toastr.error(error.error.Message, 'Thông báo lỗi'); }
        }
      }
    )
  }
  updateCategory() {

  }


  addBrand() {
    if (this.formBrand.invalid) {
      this.validateAllFormFields(this.formBrand);
      this.toastr.error("Dữ liệu không được để trống", "Thông báo lỗi");
      return;
    }
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    if (this.indexBrand != -1) {
      this.brandUpdate = this.formBrand.value;
      this.brandUpdate.CategoryId = this.formCategory.value.Id;
      this.brandUpdate.ImageBrand = this.ImageBrand;

      if (this.formBrand.value.IsShow) {
        this.brandUpdate.IsShow = 1;
      }
      else {
        this.brandUpdate.IsShow = 0;
      }
      this.brandService.update(this.brandUpdate).subscribe({
        next: (res: any) => {
          this.toastr.success(res.Message, 'Thông báo');
          this.brandService.getAllByCategoryId(this.formCategory.value.Id).subscribe(
            (res: any) => {
              this.brands = res.Data;
            }
          )
          this.largeModal.hide();
        },
        error: (error) => {
          if (error.status === 401) {
            this.refreshTokenService.refreshToken()
              .subscribe((res) => {
                tokenStorage.AccessToken = res['Data'].AccessToken;
                localStorage.setItem('token', JSON.stringify(tokenStorage));
                this.brandService.update(this.brands[this.indexBrand]).subscribe({
                  next: (res: any) => {
                    this.toastr.success(res.Message, 'Thông báo');
                    this.brandService.getAllByCategoryId(this.formCategory.value.Id).subscribe(
                      (res: any) => {
                        this.brands = res.Data;
                      }
                    )
                  },
                  error: (error) => {
                    this.toastr.error(error.error.Message, 'Thông báo lỗi');
                  }
                })
              });
          }
          else { this.toastr.error(error.error.Message, 'Thông báo lỗi'); }
        }

      })
    }
    else {
      delete this.formBrand.value.Id;
      this.brandCreate = this.formBrand.value;
      this.brandCreate.CategoryId = this.formCategory.value.Id;
      this.brandCreate.ImageBrand = this.ImageBrand;

      if (this.formBrand.value.IsShow) {
        this.brandCreate.IsShow = 1;
      }
      else {
        this.brandCreate.IsShow = 0;
      }


      this.brandService.create(this.brandCreate).subscribe(
        {
          next: (res: any) => {
            this.toastr.success(res.Message, 'Thông báo');
            this.brandService.getAllByCategoryId(this.formCategory.value.Id).subscribe(
              (res: any) => {
                this.brands = res.Data;
              }
            )
            this.largeModal.hide();
          },
          error: (error) => {
            if (error.status === 401) {
              this.refreshTokenService.refreshToken()
                .subscribe((res) => {
                  tokenStorage.AccessToken = res['Data'].AccessToken;
                  localStorage.setItem('token', JSON.stringify(tokenStorage));
                  this.brandService.create(this.brandCreate).subscribe({
                    next: (res: any) => {
                      this.toastr.success(res.Message, 'Thông báo');
                      this.brandService.getAllByCategoryId(this.formCategory.value.Id).subscribe(
                        (res: any) => {
                          this.brands = res.Data;
                        }
                      )
                    },
                    error: (error) => {
                      this.toastr.error(error.error.Message, 'Thông báo lỗi');
                    }
                  })
                });
            }
            else { this.toastr.error(error.error.Message, 'Thông báo lỗi'); }
          }

        }
      )
    }


  }
  updateBrand(brand, i) {
    this.formBrand.patchValue(brand);
    this.ImageBrand = brand.ImageBrand
    this.indexBrand = i;
    this.isEditModeBrand = true;
    this.largeModal.show();
  }
  onshowBrand() {
    this.formBrand.reset();
    this.ImageBrand = null;
    this.indexBrand = -1;
    this.isEditModeBrand = false;
    this.largeModal.show();
  }
  deleteCategory(content, i) {
    this.indexBrand = i;
    this.modalReference = this.modalService.open(this.content);
    this.modalReference.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {

      }
    );
  }

  removeBrand() {
    this.modalReference.close();
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    this.brandService.delete(this.brands[this.indexBrand].Id).subscribe(
      {
        next: (res: any) => {
          this.toastr.success(res.Message, 'Thông báo');
          this.brandService.getAllByCategoryId(this.formCategory.value.Id).subscribe(
            (res: any) => {
              this.brands = res.Data;
            }
          )
        },
        error: (error) => {
          if (error.status === 401) {
            this.refreshTokenService.refreshToken()
              .subscribe((res) => {
                tokenStorage.AccessToken = res['Data'].AccessToken;
                localStorage.setItem('token', JSON.stringify(tokenStorage));
                this.brandService.delete(this.brands[this.indexBrand].Id).subscribe({
                  next: (res: any) => {
                    this.brandService.getAllByCategoryId(this.formCategory.value.Id).subscribe(
                      (res: any) => {
                        this.brands = res.Data;
                      }
                    )
                    this.toastr.success(res.Message, 'Thông báo');

                  },
                  error: (error) => {
                    this.toastr.error(error.error.Message, 'Thông báo lỗi');
                  }
                })
              });
          }
          else { this.toastr.error(error.error.Message, 'Thông báo lỗi'); }
        }
      }
    )
  }
}
