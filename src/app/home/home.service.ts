import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError as _throw  } from "rxjs";
//import 'rxjs/add/observable/throw';
import { timeout, map, catchError } from 'rxjs/operators';

@Injectable(
    // Instead of providers array you can use provideIn
    // Learn more https://angular.io/guide/providers
    {
        providedIn: "root"
    }
)

export class HomeService {
    private serverUrl = "https://httpbin.org/get";

    constructor(private http: HttpClient) { }

    getData() {
        let headers = this.createRequestHeader();
        return this.http.get(this.serverUrl, { headers: headers });
    }

    insertCIF(payload) {
        return this.http.post<any>('https://flowhms-api.herokuapp.com/api/announcement', payload)
            .pipe(timeout(5000), map(res => {
                return res;
            }), catchError((e: any) => {
                return Observable.throw('Oops! Something went wrong. Please try again.');
            }));
    }

    private createRequestHeader() {
        // set headers here e.g.
        let headers = new HttpHeaders({
            "AuthKey": "my-key",
            "AuthToken": "my-token",
            "Content-Type": "application/json",
         });

        return headers;
    }
}