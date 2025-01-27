import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { BaseClient } from './base-client';

@Injectable({
  providedIn: 'root'
})
export class ApiService extends BaseClient {

  constructor(private http: HttpClient) {
    super();
  }

  getSubject(): Observable<any> {
    const url = '/api/subjects';  // URL simulada
    return this.getFake(url); 
  }

  getExamType(): Observable<any> {
    const url = '/api/examTypes';  // URL simulada
    return this.getFake(url); 
  }
}
