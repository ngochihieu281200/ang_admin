import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { BrandCreate, BrandInfo, CategoryCreate } from 'src/app/model/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { BrandService } from 'src/app/services/brand.service';
import { RefreshTokenService } from 'src/app/services/refresh-token.service';

@Component({
  selector: 'app-add-update-category',
  templateUrl: './add-update-category.component.html',
  styleUrls: ['./add-update-category.component.scss'],
})
export class AddUpdateCategoryComponent implements OnInit {

  @ViewChild('largeModal') public largeModal: ModalDirective;

  formCategory: FormGroup;
  formBrand: FormGroup;
  isEditMode: boolean;
  isEditModeBrand: boolean;
  ImageCategory;
  ImageBrand;
  category: CategoryCreate;
  brands: any[];
  brandCreate: any;
  brandUpdate: any;
  id;
  isShow: boolean;
  indexBrand = -1;

  constructor(private refreshTokenService: RefreshTokenService,
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private route: ActivatedRoute) { }

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
      Id: new FormControl(),
      Name: new FormControl(''),
      IsShow: new FormControl(''),
    });

    this.formBrand = new FormGroup({
      Id: new FormControl(),
      Name: new FormControl(''),
      IsShow: new FormControl(''),
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
          this.brandService.getAllByCategoryId(this.brandCreate.CategoryId).subscribe(
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
                this.brandService.update(this.brands[this.indexBrand]).subscribe((res: any) => {
                  if (res.IsSuccess) {
                    this.toastr.success(res.Message, 'Thông báo');
                  }
                  else { this.toastr.success(res.Message, 'Thông báo lỗi'); }
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
            this.brandService.getAllByCategoryId(this.brandCreate.CategoryId).subscribe(
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
                  this.brandService.create(this.brandCreate).subscribe((res: any) => {
                    if (res.IsSuccess) {
                      this.toastr.success(res.Message, 'Thông báo');
                    }
                    else { this.toastr.success(res.Message, 'Thông báo lỗi'); }
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

  removeBrand(i) {

  }
}
