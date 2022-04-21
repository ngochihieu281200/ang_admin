import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { apiEndpoint } from '../config/api';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient:HttpClient) { }

  public userLogin(Username:any,Password:any){
    return this.httpClient.post<any>(`${apiEndpoint}authenticate/system-login`,{Username, Password})

  }
}
