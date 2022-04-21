import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../../../services/product.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiEndpoint } from './../../../../config/api';
import { ResultProductDetail } from 'src/app/model/result.model';
const httpOptions = {
  herders: new HttpHeaders({ 'Content-Type': 'Application/json' }),
};

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.scss'],
})
export class AddUpdateProductComponent implements OnInit {
  detail : ResultProductDetail;
  id;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private httpClient: HttpClient
  ) { }

  async ngOnInit(): Promise<void> {
    const tokenStorage = JSON.parse(localStorage.getItem("token"))
    console.log(tokenStorage)

    this.id = this.route.snapshot.params.id;
    (await this.productService.callApiWithToken('', this.id))
      .subscribe((res: any) => (this.detail = res,console.log("res",res)),
        async (err) => {
          if (err.status === 401) {
            await this.httpClient.post(`${apiEndpoint}authenticate/refresh-token`, {
              headers: {
                'Content-Type': 'application/json',
              },
              "RefreshToken": tokenStorage.RefreshToken
            }).subscribe(res => {
              // console.log('res', res)
              tokenStorage.AccessToken = res['Data'].AccessToken;
              localStorage.setItem("token", JSON.stringify(tokenStorage));
              // console.log('this.accessToken', this.accessToken)
              this.productService.callApiWithToken("", this.id);
            });
          }
        }

      )
    console.log('this.detail', this.detail)
  }
}

