import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiEndpoint } from '../config/api';
import { Result } from '../model/result.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }


  GetAllOrderPending(): Observable<Result> {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    return this.httpClient.get<Result>(`${apiEndpoint}order/all-pending-portal`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenStorage.AccessToken}`,
      },
    })
  }

  GetAllOrderCancle(): Observable<Result> {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    return this.httpClient.get<Result>(`${apiEndpoint}order/all-cancle-portal`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenStorage.AccessToken}`,
      },
    })
  }

  GetDetailOrder(OrderId): Observable<Result> {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    return this.httpClient.get<Result>(`${apiEndpoint}order/get-detail-portal/${OrderId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenStorage.AccessToken}`,
      },
    })
  }

  ConfirmOrder(OrderId): Observable<Result> {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    return this.httpClient.post<Result>(`${apiEndpoint}order/confirm-by-staff/${OrderId}`, "", {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenStorage.AccessToken}`,
      },
    })
  }
}
