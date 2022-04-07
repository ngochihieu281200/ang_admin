import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../../../services/product.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiEndpoint } from './../../../../config/api';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.scss'],
})
export class AddUpdateProductComponent implements OnInit {
  detail;
  id;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    let newToken;
    this.id = this.route.snapshot.params.id;
    const refreshToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjYyM2FhMWE5ZGE3NjI4OWU2ZWQ3OGI4NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJBZG1pbkAxMjMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTY0OTkyNjA3NCwiaXNzIjoiaHR0cHM6Ly93ZWJhcGkudGVkdS5jb20udm4iLCJhdWQiOiJodHRwczovL3dlYmFwaS50ZWR1LmNvbS52biJ9.pFHO9sqzBTUbtdNA92DykCW3qT3XBsXQA0kxxC686Nw';
    this.productService
      .callApiWithToken('', this.route.snapshot.params.id)
      .subscribe(
        (res) => {
          this.detail = res['Data'];
          console.log('res chien bui', res);
        },
        (err) => {
          if (err.status === 401) {
            newToken = this.httpClient.post(
              `${apiEndpoint}authenticate/refresh-token`,
              {
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken: refreshToken }),
              }
            );
            this.httpClient
              .get(
                `${apiEndpoint}product/details/${this.route.snapshot.params.id}`,
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${newToken}`,
                  },
                }
              )
              .subscribe((res) => {
                console.log('res2', res);
                this.detail = res['Data'];
              });
          }
        }
      );

    console.log('this.detail', this.detail);
  }
}
