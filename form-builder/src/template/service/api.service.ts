import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'https://reqres.in/api/users'; //Mock Api

  constructor(private http: HttpClient) {
  }
  
  postData(body: any) {
    return this.http.post(this.baseUrl, body, {
      headers: {
        'x-api-key': 'reqres-free-v1'
      }
    }).pipe(
      delay(3000),
      retry(3),
      catchError(err => {
        return throwError(() => new Error('Error Sending POST req'));
      })
    )
  }
}
