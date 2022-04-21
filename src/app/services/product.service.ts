import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { async, Observable, observable, of } from 'rxjs';
import { apiEndpoint } from '../config/api';
import { result, ResultProduct, ResultProductDetail } from '../model/result.model';
import { ProductDetail } from 'src/app/model/product.model';
import {accessToken,data} from '../model/user.model'

const httpOptions = {
  herders: new HttpHeaders({ 'Content-Type': 'Application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  data : ResultProductDetail ;
   constructor(private httpClient: HttpClient) {}
  RetrieveAll(): Observable<ResultProduct> {
    return this.httpClient.get<ResultProduct>(
      `${apiEndpoint}product/mobile/all`
    );
  }
  // GetDetail(): Observable<ResultProductDetail> {
  //   return this.httpClient.get<ResultProductDetail>(
  //     `${apiEndpoint}product/details/{Id}`
  //   );
  // }
  async callApiWithToken(url, id) {
    const tokenStorage = JSON.parse(localStorage.getItem("token"))

    // const body=JSON.stringify(person);
    // let token = JSON.parse(localStorage.getItem('token'));
    // console.log('this.accessToken', this.accessToken)
    return this.httpClient.get(`${apiEndpoint}product/details/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${tokenStorage.AccessToken}`,
      },
    })






  }

}

// this.httpClient.post(`${apiEndpoint}/authenticate/refresh-token`,{
//   headers : {
//     'Content-Type':'application/json'
//   },
//   body:JSON.stringify({'RefreshToken':refreshToken})
// }).subscribe(res => (
//   console.log('res', res),
//   this.accessToken = res['Data'].AccessToken),
//   this.callApiWithToken('',id))




// if (err.status === 401) {
//   newToken = this.httpClient.post(
//     `${apiEndpoint}authenticate/refresh-token`,
//     {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ refreshToken: refreshToken }),
//     }
//   );
//   this.httpClient.get(`${apiEndpoint}product/details/${id}`, {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${newToken}`,
//     },
//   });
// }
// if (res['Status'] === 401 || res['Status'] === 403) {
//   let newToken = this.httpClient.post(
//     `${apiEndpoint}authenticate/refresh-token`,
//     {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ refreshToken: refreshToken }),
//     }
//   );
//   return this.httpClient.get(`${apiEndpoint}product/details/${id}`, {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${newToken}`,
//     },
//   });
// } else {
//   return this.httpClient.get(`${apiEndpoint}product/details/${id}`, {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });
// }

// return fetch(url), {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${accessToken}
//     },
//     body: JSON.stringify(id)
// }.then(async res => {
//     if (res?.status === 403 || res?.status === 401) {
//         let refreshToken = token?.refreshToken
//         let newToken = await fetch(, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 'refreshToken': refreshToken
//             })
//         }).then(res => res.json())

//         localStorage.setItem('token', JSON.stringify(newToken.data))
//         accessToken = newToken?.data?.accessToken
//         return fetch(url), {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': Bearer ${accessToken}
//             },
//             body: JSON.stringify(params)
//         }
//     }
//     else{
//         return res.json()
//     }
