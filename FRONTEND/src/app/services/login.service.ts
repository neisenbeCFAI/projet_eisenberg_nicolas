import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    URL_ENDPOINT_USER: string = "/users/" as const;

    isAuth = false;
    user: User = new User("", "", "","", "", "", "", "", "", "", "", "");

    constructor(private http: HttpClient) { }

    register(form_user: User): Observable<User> {
        let data = JSON.stringify(form_user)
        let httpOption = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        return this.http.post<User>(environment.apiURL + this.URL_ENDPOINT_USER, data, httpOption);
    }

    me(): Observable<User> {
        return this.http.get<User>(environment.apiURL + this.URL_ENDPOINT_USER + "me");
    }

    login(email: string, password: string): Observable<{"access_token": string, "token_type": string}> {
       let body = new URLSearchParams()
       body.set('username', email)
       body.set('password', password)
        let httpOption = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
        return this.http.post<{"access_token": string, "token_type": string}>(environment.apiURL + "/token", body.toString(), httpOption);
    }

    signOut() {
        this.user = new User("", "","", "", "", "", "", "", "", "", "", "");
        this.isAuth = false;
    }
}
