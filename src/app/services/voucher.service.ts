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
export class VoucherService {

  constructor(private httpClient: HttpClient) { }


  GetAllVoucher(): Observable<Result> {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    return this.httpClient.get<Result>(`${apiEndpoint}voucher/all`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenStorage.AccessToken}`,
      },
    });
  }

  AddVoucher(voucher): Observable<Result> {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    return this.httpClient.post<Result>(`${apiEndpoint}voucher/create`, JSON.stringify(voucher), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenStorage.AccessToken}`,
      },
    });
  }

  UpdateVoucher(voucher): Observable<Result> {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    return this.httpClient.put<Result>(`${apiEndpoint}voucher/update`, JSON.stringify(voucher), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenStorage.AccessToken}`,
      },
    });
  }

  DeleteVoucher(voucherId): Observable<Result> {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    return this.httpClient.delete<Result>(`${apiEndpoint}voucher/delete/${voucherId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenStorage.AccessToken}`,
      },
    });
  }

  GetDetailVoucher(voucherId): Observable<Result> {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    return this.httpClient.get<Result>(`${apiEndpoint}voucher/details/${voucherId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenStorage.AccessToken}`,
      },
    });
  }
}
