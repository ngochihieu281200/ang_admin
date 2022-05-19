import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../../../services/product.service';
import { CategoryService } from './../../../../services/category.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiEndpoint } from './../../../../config/api';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ClassifyProduct } from './../../../../model/classifyProduct.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ResultProductDetail } from 'src/app/model/result.model';
import { BrandInfo, CategoryInfo } from 'src/app/model/category.model';
import {
  ProductCreate,
  ProductDetail,
  ProductInfo,
} from 'src/app/model/product.model';

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
  product: ProductCreate;
  detail: ProductDetail;
  id;
  isAddMode: boolean;
  closeResult = '';
  ClassifyProducts: any[] = [];
  ClassifyProduct: ClassifyProduct;
  Features: any[] = [];
  CategoryList: CategoryInfo[];
  BrandList: BrandInfo[];
  updateProduct = false;
  brandProduct = true;
  ImageClassifyProduct;
  Thumbnail;
  TypeProduct;
  Classify: any;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private httpClient: HttpClient
  ) {}

  async ngOnInit(): Promise<void> {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));

    this.id = this.route.snapshot.params.id;
    this.isAddMode = !this.id;
    if (!this.isAddMode) {
      (await this.productService.getDetailProductById('', this.id)).subscribe(
        (res: any) => (
          this.formProduct.patchValue(res.Data),
          (this.ClassifyProducts = res.Data.ClassifyProducts),
          this.GetBrands(res.Data.CategoryID),
          (this.Thumbnail = res.Data.Thumbnail),
          (this.Features = res.Data.Feature)
        ),
        async (err) => {
          if (err.status === 401) {
            await this.httpClient
              .post(
                `${apiEndpoint}authenticate/refresh-token`,
                JSON.stringify({ RefreshToken: tokenStorage.RefreshToken }),
                {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                }
              )
              .subscribe((res) => {
                tokenStorage.AccessToken = res['Data'].AccessToken;
                localStorage.setItem('token', JSON.stringify(tokenStorage));
                window.location.reload();
              });
          }
        }
      );
    }

    (await this.categoryService.getAll()).subscribe(
      (res: any) => (this.CategoryList = res.Data),
      async (err) => {
        if (err.status === 401) {
          await this.httpClient
            .post(
              `${apiEndpoint}authenticate/refresh-token`,
              JSON.stringify({ RefreshToken: tokenStorage.RefreshToken }),
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            )
            .subscribe((res) => {
              tokenStorage.AccessToken = res['Data'].AccessToken;
              localStorage.setItem('token', JSON.stringify(tokenStorage));
              window.location.reload();
            });
        }
      }
    );
    // Form Group
    this.formProduct = new FormGroup({
      Id: new FormControl(),
      CategoryID: new FormControl(''),
      BrandID: new FormControl(''),
      Name: new FormControl(''),
      Crytal: new FormControl(''),
      Ablert: new FormControl(''),
      WaterProof: new FormControl(''),
      Guarantee: new FormControl('2000-07-25'),
      MadeIn: new FormControl(''),
      Machine: new FormControl(),
      Description: new FormControl(''),
      IsShow: new FormControl(''),
    });

    this.formClassifyProduct = new FormGroup({
      Name: new FormControl(''),
      OriginalPrice: new FormControl(),
      PromotionPrice: new FormControl(),
      Stock: new FormControl(),
      IsShow: new FormControl(),
      Image: new FormControl(),
    });
    console.log(this.formProduct);
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
  removeTypeProduct(index) {
    this.ClassifyProducts.splice(index, 1);
    console.log(this.removeTypeProduct);
  }
  addClassifyProduct() {
    this.ClassifyProduct = this.formClassifyProduct.value;
    this.ClassifyProduct.Image = this.ImageClassifyProduct;
    if (this.formClassifyProduct.value.IsShow) {
      this.ClassifyProduct.IsShow = 1;
    }
    this.ClassifyProducts.push(this.ClassifyProduct);
    console.log(this.ClassifyProducts);
  }
  categoryChange(event) {
    var CategoryId = event.target.value;
    const tokenStorage = JSON.parse(localStorage.getItem('token'));

    this.categoryService.getAllBrandByIdCategory(CategoryId).subscribe({
      next: (res: any) => {
        (this.BrandList = res.Data), (this.brandProduct = false);
      },
      error: async (err) => {
        (this.BrandList = null), (this.brandProduct = true);
        if (err.status === 401) {
          await this.httpClient
            .post(`${apiEndpoint}authenticate/refresh-token`, {
              headers: {
                'Content-Type': 'application/json',
              },
              RefreshToken: tokenStorage.RefreshToken,
            })
            .subscribe((res) => {
              tokenStorage.AccessToken = res['Data'].AccessToken;
              localStorage.setItem('token', JSON.stringify(tokenStorage));
              window.location.reload();
            });
        }
      },
    });
  }

  GetBrands(CategoryID) {
    var CategoryId = CategoryID;
    const tokenStorage = JSON.parse(localStorage.getItem('token'));

    this.categoryService.getAllBrandByIdCategory(CategoryId).subscribe({
      next: (res: any) => {
        (this.BrandList = res.Data), (this.brandProduct = false);
      },
      error: async (err) => {
        (this.BrandList = null), (this.brandProduct = true);
        if (err.status === 401) {
          await this.httpClient
            .post(`${apiEndpoint}authenticate/refresh-token`, {
              headers: {
                'Content-Type': 'application/json',
              },
              RefreshToken: tokenStorage.RefreshToken,
            })
            .subscribe((res) => {
              tokenStorage.AccessToken = res['Data'].AccessToken;
              localStorage.setItem('token', JSON.stringify(tokenStorage));
              window.location.reload();
            });
        }
      },
    });
  }

  addProduct() {
    delete this.formProduct.value.Id;
    this.product = this.formProduct.value;
    this.product.Thumbnail = this.Thumbnail;
    this.product.ClassifyProducts = [];
    this.product.Feature = [];
    for (let i = 0; i < this.ClassifyProducts.length; i++) {
      this.product.ClassifyProducts.push(this.ClassifyProducts[i]);
    }
    for (let i = 0; i < this.Features.length; i++) {
      this.product.Feature.push(this.Features[i]);
    }
    if (this.formProduct.value.IsShow) {
      this.product.IsShow = 1;
    }

    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    this.productService.create(this.product).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: async (err) => {
        (this.BrandList = null), (this.brandProduct = true);
        if (err.status === 401) {
          await this.httpClient
            .post(`${apiEndpoint}authenticate/refresh-token`, {
              headers: {
                'Content-Type': 'application/json',
              },
              RefreshToken: tokenStorage.RefreshToken,
            })
            .subscribe((res) => {
              tokenStorage.AccessToken = res['Data'].AccessToken;
              localStorage.setItem('token', JSON.stringify(tokenStorage));
              window.location.reload();
            });
        }
      },
    });
  }
  addTypeProduct(typeForm) {
    console.log(typeForm);
  }
}
