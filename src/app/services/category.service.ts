import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiEndpoint } from '../config/api';
import { BrandInfo, CategoryInfo } from '../model/category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

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
}
