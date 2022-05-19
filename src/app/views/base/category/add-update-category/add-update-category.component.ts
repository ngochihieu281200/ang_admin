import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryCreate } from 'src/app/model/category.model';

@Component({
  selector: 'app-add-update-category',
  templateUrl: './add-update-category.component.html',
  styleUrls: ['./add-update-category.component.scss'],
})
export class AddUpdateCategoryComponent implements OnInit {
  formCategory;
  ImageCategory;
  category: CategoryCreate;

  constructor() {}

  ngOnInit(): void {
    this.formCategory = new FormGroup({
      Id: new FormControl(),
      Name: new FormControl(''),
      IsShow: new FormControl(''),
    });
  }
  handleUploadProduct(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.ImageCategory = reader.result;
    };
  }
  // addCategory() {
  //   delete this.formCategory.value.Id;
  //   this.category = this.formCategory.value;
  //   this.category.ImageCategory = this.ImageCategory;
  //   this.category.ClassifyProducts = [];

  //   for (let i = 0; i < this.ClassifyProducts.length; i++) {
  //     this.product.ClassifyProducts.push(this.ClassifyProducts[i]);
  //   }
  //   for (let i = 0; i < this.Features.length; i++) {
  //     this.product.Feature.push(this.Features[i]);
  //   }
  //   if (this.formCategory.value.IsShow) {
  //     this.product.IsShow = 1;
  //   }

  //   const tokenStorage = JSON.parse(localStorage.getItem('token'));
  //   this.productService.create(this.product).subscribe({
  //     next: (res: any) => {
  //       console.log(res);
  //     },
  //     error: async (err) => {
  //       (this.BrandList = null), (this.brandProduct = true);
  //       if (err.status === 401) {
  //         await this.httpClient
  //           .post(`${apiEndpoint}authenticate/refresh-token`, {
  //             headers: {
  //               'Content-Type': 'application/json',
  //             },
  //             RefreshToken: tokenStorage.RefreshToken,
  //           })
  //           .subscribe((res) => {
  //             tokenStorage.AccessToken = res['Data'].AccessToken;
  //             localStorage.setItem('token', JSON.stringify(tokenStorage));
  //             window.location.reload();
  //           });
  //       }
  //     },
  //   });
  // }
}
