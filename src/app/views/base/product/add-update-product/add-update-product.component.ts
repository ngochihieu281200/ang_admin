import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../../../services/product.service';
import { CategoryService } from './../../../../services/category.service';
import { HttpHeaders } from '@angular/common/http';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ClassifyProductCreate, ClassifyProductUpdate } from './../../../../model/classifyProduct.model';
import { ToastrService } from 'ngx-toastr';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BrandInfo, CategoryInfo } from 'src/app/model/category.model';
import {
  ProductCreate,
  ProductDetail,
  ProductUpdate,
} from 'src/app/model/product.model';
import { RefreshTokenService } from 'src/app/services/refresh-token.service';
import { NgxSpinnerService } from "ngx-spinner";

const httpOptions = {
  herders: new HttpHeaders({ 'Content-Type': 'Application/json' }),
};
@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.scss'],
})
export class AddUpdateProductComponent implements OnInit {
  @ViewChild('largeModal') public largeModal: ModalDirective;
  formProduct: FormGroup;
  formClassifyProduct: FormGroup;
  productCreate: ProductCreate;
  productUpdate: ProductUpdate;
  detail: ProductDetail;
  id;
  isAddMode: boolean;
  closeResult = '';
  ClassifyProducts: any[] = [];
  ClassifyProductCreate: ClassifyProductCreate;
  ClassifyProductUpdate: ClassifyProductUpdate;
  Features: any[] = [];
  CategoryList: CategoryInfo[];
  BrandList: BrandInfo[];
  editMode = false;
  editModeTypeProduct = false;
  indexTypeProduct = -1;
  brandProduct = true;
  ImageClassifyProduct;
  Thumbnail;
  TypeProduct;
  Classify: any;

  constructor(
    private productService: ProductService,
    private refreshTokenService: RefreshTokenService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  async ngOnInit(): Promise<void> {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));

    this.id = this.route.snapshot.params.id;
    if (this.id == "id") {
      this.isAddMode = false;
    } else this.isAddMode = true;
    if (this.isAddMode) {
      console.log("hi");
      this.spinner.show();
      (await this.productService.getDetailProductById(this.id)).subscribe(
        (res: any) => (
          this.formProduct.patchValue(res.Data),
          (this.ClassifyProducts = res.Data.ClassifyProducts),
          this.GetBrands(res.Data.CategoryId),
          this.Thumbnail = res.Data.Thumbnail,
          this.Features = res.Data.Feature,
          this.editMode = true,
          this.spinner.hide()),
        async (err) => {
          if (err.status === 401) {
            this.refreshTokenService.refreshToken()
              .subscribe((res) => {
                tokenStorage.AccessToken = res['Data'].AccessToken;
                localStorage.setItem('token', JSON.stringify(tokenStorage));
                this.productService.getDetailProductById(this.id).subscribe(
                  (res: any) => {
                    this.formProduct.patchValue(res.Data),
                      this.ClassifyProducts = res.Data.ClassifyProducts,
                      this.GetBrands(res.Data.CategoryId),
                      this.Thumbnail = res.Data.Thumbnail,
                      this.Features = res.Data.Feature,
                      this.spinner.hide()
                  }
                )
              });
          }
        }
      );
    }
    this.spinner.show();
    (await this.categoryService.getAll()).subscribe(
      (res: any) => (this.CategoryList = res.Data, this.spinner.hide()),
      async (err) => {
        if (err.status === 401) {
          this.refreshTokenService.refreshToken()
            .subscribe((res) => {
              tokenStorage.AccessToken = res['Data'].AccessToken;
              localStorage.setItem('token', JSON.stringify(tokenStorage));
              this.categoryService.getAll().subscribe((res: any) => {
                this.CategoryList = res.Data
                this.spinner.hide()
              })
            });
        }
      }
    );
    // Form Group
    this.formProduct = new FormGroup({
      Id: new FormControl(),
      CategoryId: new FormControl('', Validators.required),
      BrandId: new FormControl('', Validators.required),
      Name: new FormControl('', Validators.required),
      Crytal: new FormControl('', Validators.required),
      Ablert: new FormControl('', Validators.required),
      WaterProof: new FormControl('', Validators.required),
      Guarantee: new FormControl('', Validators.required),
      MadeIn: new FormControl('', Validators.required),
      Machine: new FormControl(Validators.required),
      Description: new FormControl('', Validators.required),
      IsShow: new FormControl('', Validators.required),
    });

    this.formClassifyProduct = new FormGroup({
      Id: new FormControl(),
      Name: new FormControl('', Validators.required),
      OriginalPrice: new FormControl(null, Validators.required),
      PromotionPrice: new FormControl(null, Validators.required),
      Stock: new FormControl(null, Validators.required),
      IsShow: new FormControl(),
    });

  }
  get f() {
    return this.formProduct.controls;
  }

  handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.ImageClassifyProduct = reader.result;
    };
  }

  handleUploadProduct(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.Thumbnail = reader.result;
    };
  }
  addFeature(placeId) {
    this.Features.push(placeId);
  }
  removeFeature(index) {
    this.Features.splice(index, 1);
  }

  OnShowTypeProduct() {
    this.formClassifyProduct.reset();
    this.ImageClassifyProduct = null;
    this.editModeTypeProduct = false;
    this.indexTypeProduct = -1;
    this.largeModal.show();
  }
  removeTypeProduct(i) {
    this.ClassifyProducts.splice(i, 1);
    console.log(this.removeTypeProduct);
  }
  updateTypeProduct(ClassifyProduct, i) {
    this.formClassifyProduct.patchValue(ClassifyProduct);
    this.ImageClassifyProduct = ClassifyProduct.Image;
    this.editModeTypeProduct = true;
    this.indexTypeProduct = i;
    this.largeModal.show();
  }
  addClassifyProduct() {

    if (this.formClassifyProduct.invalid) {
      this.validateAllFormFields(this.formClassifyProduct);
      this.toastr.error("Dữ liệu không được để trống", "Thông báo lỗi");
      return;
    }
    if (this.ClassifyProducts.length > 4) {
      this.toastr.error("Loại sản phẩm tối đa chỉ được 4", "Thông báo lỗi");
      return;
    }

    if (this.indexTypeProduct != -1) {
      this.ClassifyProductUpdate = this.formClassifyProduct.value;
      this.ClassifyProductUpdate.Image = this.ImageClassifyProduct;

      if (this.formClassifyProduct.value.IsShow) {
        this.ClassifyProductUpdate.IsShow = 1;
      }
      else {
        this.ClassifyProductUpdate.IsShow = 0;
      }

      this.ClassifyProducts[this.indexTypeProduct] = this.ClassifyProductUpdate;
    }
    else {
      this.ClassifyProductCreate = this.formClassifyProduct.value;
      this.ClassifyProductCreate.Image = this.ImageClassifyProduct;

      if (this.formClassifyProduct.value.IsShow) {
        this.ClassifyProductCreate.IsShow = 1;
      }
      else {
        this.ClassifyProductCreate.IsShow = 0;
      }

      this.ClassifyProducts.push(this.ClassifyProductCreate);
    }
    this.largeModal.hide();
  }

  // Call Api Category
  categoryChange(event) {
    var CategoryId = event.target.value;
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    this.spinner.show();
    this.categoryService.getAllBrandByIdCategory(CategoryId).subscribe({
      next: (res: any) => {
        (this.BrandList = res.Data, this.spinner.hide()), (this.brandProduct = false);
      },
      error: async (err) => {
        (this.BrandList = null), (this.brandProduct = true);
        if (err.status === 401) {
          this.refreshTokenService.refreshToken()
            .subscribe((res) => {
              tokenStorage.AccessToken = res['Data'].AccessToken;
              localStorage.setItem('token', JSON.stringify(tokenStorage));
              this.categoryService.getAllBrandByIdCategory(CategoryId).subscribe(
                (res: any) => {
                  this.BrandList = res.Data
                  this.brandProduct = false
                  this.spinner.hide();
                }
              )
            });
        }
      },
    });
  }

  GetBrands(CategoryId) {
    var CategoryId = CategoryId;
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    this.spinner.show();
    this.categoryService.getAllBrandByIdCategory(CategoryId).subscribe({
      next: (res: any) => {
        (this.BrandList = res.Data, this.spinner.hide()), (this.brandProduct = false);
      },
      error: async (err) => {
        (this.BrandList = null), (this.brandProduct = true);
        if (err.status === 401) {
          this.refreshTokenService.refreshToken()
            .subscribe((res) => {
              tokenStorage.AccessToken = res['Data'].AccessToken;
              localStorage.setItem('token', JSON.stringify(tokenStorage));
              this.categoryService.getAllBrandByIdCategory(CategoryId).subscribe(
                (res: any) => {
                  this.BrandList = res.Data,
                    this.brandProduct = false
                  this.spinner.hide()
                }
              )
            });
        }
      },
    });
  }

  // Add and Update Product
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

    if (this.formProduct.invalid) {
      this.validateAllFormFields(this.formProduct);
      this.toastr.error("Dữ liệu không được để trống", "Thông báo lỗi");
      return;
    }

    if (this.editMode) {
      this.updateProduct();
    }
    else {
      this.addProduct();
    }
  }


  updateProduct() {
    this.productUpdate = this.formProduct.value;
    this.productUpdate.Thumbnail = this.Thumbnail;
    this.productUpdate.ClassifyProducts = [];
    this.productUpdate.Feature = [];

    for (let i = 0; i < this.ClassifyProducts.length; i++) {
      this.productUpdate.ClassifyProducts.push(this.ClassifyProducts[i]);
    }
    for (let i = 0; i < this.Features.length; i++) {
      this.productUpdate.Feature.push(this.Features[i]);
    }

    if (this.formProduct.value.IsShow) {
      this.productUpdate.IsShow = 1;
    }
    else {
      this.productCreate.IsShow = 0;
    }
    this.spinner.show();
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    this.productService.update(this.productUpdate).subscribe({
      next: (res: any) => {
        this.toastr.success(res.Message, "Thông báo");
        this.spinner.hide();
      },
      error: async (err) => {
        (this.BrandList = null), (this.brandProduct = true);
        if (err.status === 401) {
          this.refreshTokenService.refreshToken()
            .subscribe((res) => {
              tokenStorage.AccessToken = res['Data'].AccessToken;
              localStorage.setItem('token', JSON.stringify(tokenStorage));
              this.productService.create(this.productUpdate).subscribe({
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
        else { this.toastr.error(err.error.Message, 'Thông báo lỗi'); this.spinner.hide(); }
      }
    })
  }
  addProduct() {


    delete this.formProduct.value.Id;
    this.productCreate = this.formProduct.value;
    this.productCreate.Thumbnail = this.Thumbnail;
    this.productCreate.ClassifyProducts = [];
    this.productCreate.Feature = [];
    for (let i = 0; i < this.ClassifyProducts.length; i++) {
      this.productCreate.ClassifyProducts.push(this.ClassifyProducts[i]);
    }
    for (let i = 0; i < this.Features.length; i++) {
      this.productCreate.Feature.push(this.Features[i]);
    }
    if (this.formProduct.value.IsShow) {
      this.productCreate.IsShow = 1;
    }
    else {
      this.productCreate.IsShow = 0;
    }
    this.spinner.show();
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    this.productService.create(this.productCreate).subscribe({
      next: (res: any) => {
        this.toastr.success(res.Message, 'Thông báo');
        this.spinner.hide();
      },
      error: async (error) => {
        (this.BrandList = null), (this.brandProduct = true);
        if (error.status === 401) {
          this.refreshTokenService.refreshToken()
            .subscribe((res) => {
              tokenStorage.AccessToken = res['Data'].AccessToken;
              localStorage.setItem('token', JSON.stringify(tokenStorage));
              this.productService.create(this.productCreate).subscribe({
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
    });
  }
  addTypeProduct(typeForm) {
    console.log(typeForm);
  }


}
