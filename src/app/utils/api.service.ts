import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { throwError } from "rxjs";
import { timeout, map, catchError } from 'rxjs/operators';
import { take } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class APIService {

    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        const payload = { "username": username, "password": password };

        return this.http.post<any>("http://192.168.30.197:9000/api/user/login", payload)
            .pipe(map(res => {
                console.log(res)
                return res;
            }), catchError((e: any) => {
                console.log(e)
                return throwError('Oops! Something went wrong. Please try again.');
            }));
    }
}