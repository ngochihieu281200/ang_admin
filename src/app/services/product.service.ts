import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { async, Observable, observable, of } from 'rxjs';
import { apiEndpoint } from '../config/api';
import { ResultProduct, ResultProductDetail } from '../model/result.model';
import { ProductDetail } from 'src/app/model/product.model';

const httpOptions = {
  herders: new HttpHeaders({ 'Content-Type': 'Application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class ProductService {
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
  callApiWithToken(url, id) {
    const headers = { 'content-type': 'application/json' };
    let newToken;
    const refreshToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjYyM2FhMWE5ZGE3NjI4OWU2ZWQ3OGI4NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJBZG1pbkAxMjMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTY0OTkxOTUyOCwiaXNzIjoiaHR0cHM6Ly93ZWJhcGkudGVkdS5jb20udm4iLCJhdWQiOiJodHRwczovL3dlYmFwaS50ZWR1LmNvbS52biJ9.g-aARgFHWScGx0MwWoOaqTO6dYq2ul0xVergyB3HT0I';
    // const body=JSON.stringify(person);
    let token = JSON.parse(localStorage.getItem('token'));
    let accessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjYyM2FhMWE5ZGE3NjI4OWU2ZWQ3OGI4NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJBZG1pbkAxMjMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTY0OTMxOTk2OCwiaXNzIjoiaHR0cHM6Ly93ZWJhcGkudGVkdS5jb20udm4iLCJhdWQiOiJodHRwczovL3dlYmFwaS50ZWR1LmNvbS52biJ9._oDjSfVuWqvCbQe3u3t6KSC0v1-VdrZO6Syu9Z7UDKU';
    return this.httpClient.get(`${apiEndpoint}product/details/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}
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
