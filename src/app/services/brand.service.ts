import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiEndpoint } from '../config/api';
import {
  BrandCreate,
  BrandInfo,
  BrandUpdate,
  CategoryCreate,
  CategoryInfo,
} from '../model/category.model';
import { Observable } from 'rxjs';
import { Result } from '../model/result.model';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<BrandInfo> {
    return this.httpClient.get<BrandInfo>(`${apiEndpoint}brand/all`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  getAllByCategoryId(CategoryId): Observable<BrandInfo> {
    return this.httpClient.get<BrandInfo>(`${apiEndpoint}brand/all/${CategoryId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  create(brand): Observable<CategoryCreate> {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    return this.httpClient.post<CategoryCreate>(
      `${apiEndpoint}brand/create`,
      JSON.stringify(brand),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenStorage.AccessToken}`,
        },
      }
    );
  }
  update(brand): Observable<BrandUpdate> {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    return this.httpClient.put<BrandUpdate>(
      `${apiEndpoint}brand/update`,
      JSON.stringify(brand),
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
