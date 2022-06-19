import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiEndpoint } from '../config/api';
import {
  Result
} from '../model/result.model';


@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private httpClient: HttpClient) { }

  GetAllBanner(): Observable<Result> {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    return this.httpClient.get<Result>(`${apiEndpoint}banner/all`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenStorage.AccessToken}`,
      },
    });
  }

  AddBanner(banner): Observable<Result> {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    return this.httpClient.post<Result>(`${apiEndpoint}banner/create`, JSON.stringify(banner), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenStorage.AccessToken}`,
      },
    });
  }

  UpdateBanner(banner): Observable<Result> {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    return this.httpClient.put<Result>(`${apiEndpoint}banner/update`, JSON.stringify(banner), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenStorage.AccessToken}`,
      },
    });
  }

  DeleteBanner(bannerId): Observable<Result> {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    return this.httpClient.delete<Result>(`${apiEndpoint}banner/delete/${bannerId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenStorage.AccessToken}`,
      },
    });
  }

  GetDetailBanner(bannerId): Observable<Result> {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    return this.httpClient.get<Result>(`${apiEndpoint}banner/details/${bannerId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenStorage.AccessToken}`,
      },
    });
  }

}
