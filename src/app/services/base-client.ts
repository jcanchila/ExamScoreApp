import { Injectable } from "@angular/core";
import { delay, Observable, of } from "rxjs";
import fakeResponseSubject from './fake-responses/subject.json';
import fakeResponseExamType from './fake-responses/examType.json';

@Injectable({
    providedIn: 'root'
})
export class BaseClient {

    getFake<T>(url: string): Observable<T> {
        console.log(`GET request to: ${url}`);

        let response: T;

        if (url === '/api/examTypes') {
            response = fakeResponseExamType as T;
        } else if (url === '/api/subjects') {
            response = fakeResponseSubject as T;
        } else {
            response = {} as T;
        }

        return of(response).pipe(delay(1000));
    }


    get<T>(url: string): Observable<T> {
        return of({} as T).pipe(delay(1000));
    }

    post<T>(url: string, body: any): Observable<T> {
        return of({} as T).pipe(delay(1000));
    }
}