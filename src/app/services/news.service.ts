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
export class NewsService {

  constructor(private httpClient: HttpClient) { }

  GetAllNews(): Observable<Result> {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    return this.httpClient.get<Result>(`${apiEndpoint}news/all`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenStorage.AccessToken}`,
      },
    });
  }

  AddNews(news): Observable<Result> {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    return this.httpClient.post<Result>(`${apiEndpoint}news/create`, JSON.stringify(news), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenStorage.AccessToken}`,
      },
    });
  }

  UpdateNews(news): Observable<Result> {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    return this.httpClient.put<Result>(`${apiEndpoint}news/update`, JSON.stringify(news), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenStorage.AccessToken}`,
      },
    });
  }

  DeleteNews(newsId): Observable<Result> {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    return this.httpClient.delete<Result>(`${apiEndpoint}news/delete/${newsId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenStorage.AccessToken}`,
      },
    });
  }

  GetDetailNews(newsId): Observable<Result> {
    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    return this.httpClient.get<Result>(`${apiEndpoint}news/details/${newsId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenStorage.AccessToken}`,
      },
    });
  }
}
