import { Component, OnInit } from '@angular/core';
import { apiEndpoint } from 'src/app/config/api';
import { ProductService } from './../../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  detail;
  id;
  ClassifyProducts: any[];
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private httpClient: HttpClient
  ) { }

  async ngOnInit(): Promise<void> {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    // console.log(tokenStorage);

    this.id = this.route.snapshot.params.id;
    (
      await this.productService.getDetailProductById('', this.id))
      .subscribe((res: any) => (
        (

          this.detail = res.Data,
          this.ClassifyProducts = res.Data.ClassifyProducts
        ),
        console.log('Response:', res)),
        async (err) => {
          if (err.status === 401) {
            await this.httpClient
              .post(`${apiEndpoint}authenticate/refresh-token`, {
                headers: {
                  'Content-Type': 'application/json',
                },
                RefreshToken: tokenStorage.RefreshToken,
              })
              .subscribe((res) => {
                // console.log('res', res)
                tokenStorage.AccessToken = res['Data'].AccessToken;
                localStorage.setItem('token', JSON.stringify(tokenStorage));
                // console.log('this.accessToken', this.accessToken)
                this.productService.getDetailProductById('', this.id);
              });
          }
        }
      );
    console.log('this.detail', this.detail);
  }
}
