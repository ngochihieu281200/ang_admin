import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { async, Observable, of } from 'rxjs';
import { apiEndpoint } from '../config/api';
import {
  Result,
  result,
  ResultProduct,
  ResultProductDetail,
} from '../model/result.model';
import {
  ProductCreate,
  ProductDetail,
  ProductUpdate,
} from 'src/app/model/product.model';

const httpOptions = {
  herders: new HttpHeaders({ 'Content-Type': 'Application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  data: ResultProductDetail;
  apiEndpoint: string;
  constructor(private httpClient: HttpClient) { }
  RetrieveAll(PageIndex = 1, PageSize = 6): Observable<ResultProduct> {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    return this.httpClient.get<ResultProduct>(`${apiEndpoint}product/all?PageIndex=${PageIndex}&PageSize=${PageSize}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenStorage.AccessToken}`,
      },
    });
  }


  getDetailProductById(id): Observable<ProductDetail> {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    return this.httpClient.get<ProductDetail>(`${apiEndpoint}product/details/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenStorage.AccessToken}`,
      },
    });
  }

  create(product): Observable<ProductCreate> {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    return this.httpClient.post<ProductCreate>(
      `${apiEndpoint}product/create`,
      JSON.stringify(product),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenStorage.AccessToken}`,
        },
      }
    );
  }

  update(product): Observable<ProductUpdate> {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    return this.httpClient.put<ProductUpdate>(
      `${apiEndpoint}product/update`,
      JSON.stringify(product),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenStorage.AccessToken}`,
        },
      }
    );
  }

  getAllforBanner(): Observable<Result> {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    return this.httpClient.get<Result>(
      `${apiEndpoint}product/all-banner`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenStorage.AccessToken}`,
        },
      }
    );
  }

  async delete(productId) {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    return this.httpClient.delete(`${apiEndpoint}product/delete/${productId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenStorage.AccessToken}`,
      },
    });
  }


  statistical(): Observable<Result> {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    return this.httpClient.get<Result>(
      `${apiEndpoint}product/statistical`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenStorage.AccessToken}`,
        },
      }
    );
  }

}
