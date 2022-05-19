import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiEndpoint } from '../config/api';
import {
  BrandInfo,
  CategoryCreate,
  CategoryInfo,
} from '../model/category.model';
import { Observable } from 'rxjs';
import { Result } from '../model/result.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<CategoryInfo> {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    return this.httpClient.get<CategoryInfo>(`${apiEndpoint}category/all`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenStorage.AccessToken}`,
      },
    });
  }

  getAllBrandByIdCategory(CategoryId): Observable<BrandInfo> {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    return this.httpClient.get<BrandInfo>(`${apiEndpoint}brand/${CategoryId}`, {
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
  async update(category): Promise<Observable<CategoryCreate>> {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    return this.httpClient.post<CategoryInfo>(
      `${apiEndpoint}product/update`,
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
}
