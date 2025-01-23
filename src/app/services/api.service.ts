import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  post(body: any): Observable<any> {
    const simulatedResponse: any = body;
    return of(simulatedResponse).pipe(delay(2000));
  }
}
