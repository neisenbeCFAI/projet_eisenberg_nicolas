import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Produit } from 'src/app/models/produit';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CartService {


    constructor(private http: HttpClient) { }

    pay(amount: number): Observable<{"message": string}> {
        let httpOption = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post<{"message": string}>(environment.apiURL + "/payment/?amount=" + amount.toString(), "", httpOption);
    }

}
