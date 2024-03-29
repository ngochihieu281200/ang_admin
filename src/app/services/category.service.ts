import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiEndpoint } from '../config/api';
import {
  BrandInfo,
  CategoryCreate,
  CategoryInfo,
  CategoryUpdate,
} from '../model/category.model';
import { Observable } from 'rxjs';
import { Result } from '../model/result.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<CategoryInfo> {
    return this.httpClient.get<CategoryInfo>(`${apiEndpoint}category/all`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getAllBrandByIdCategory(CategoryId): Observable<BrandInfo> {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    return this.httpClient.get<BrandInfo>(`${apiEndpoint}brand/all/${CategoryId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenStorage.AccessToken}`,
      },
    });
  }
  create(category): Observable<CategoryCreate> {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    return this.httpClient.post<CategoryCreate>(
      `${apiEndpoint}category/create`,
      JSON.stringify(category),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenStorage.AccessToken}`,
        },
      }
    );
  }
  update(category): Observable<CategoryUpdate> {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    return this.httpClient.post<CategoryUpdate>(
      `${apiEndpoint}category/update`,
      JSON.stringify(category),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenStorage.AccessToken}`,
        },
      }
    );
  }
  async delete(CategoryId) {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));

    // const body=JSON.stringify(person);
    // let token = JSON.parse(localStorage.getItem('token'));
    // console.log('this.accessToken', this.accessToken)
    return this.httpClient.delete(
      `${apiEndpoint}category/delete/${CategoryId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenStorage.AccessToken}`,
        },
      }
    );
  }

  details(CategoryId) {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));

    return this.httpClient.get(
      `${apiEndpoint}category/details/${CategoryId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenStorage.AccessToken}`,
        },
      }
    );
  }
}
