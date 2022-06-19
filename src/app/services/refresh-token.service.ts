import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiEndpoint } from '../config/api';
import { ResultRefreshToken } from '../model/result.model';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  refreshToken(): Observable<ResultRefreshToken> {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    var date = new Date();
    if (tokenStorage.ExpiresRefresh < date.toISOString()) {
      (<any>this.router).navigate([`login`]);
    }
    return this.httpClient.post<ResultRefreshToken>(`${apiEndpoint}authenticate/refresh-token`, JSON.stringify({ RefreshToken: tokenStorage.RefreshToken }), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenStorage.RefreshToken}`
      },
    })
  }
}
