import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produit } from './models/produit';
import { Observable } from 'rxjs';
import {environment} from "../environments/environment";

@Injectable({
    providedIn: 'root',
})
export class MonservService {
    constructor(private httpClient: HttpClient) {}

    public getCatalogue(): Observable<Array<Produit>> {
        return this.httpClient.get<Array<Produit>>(environment.apiURL + "/products/");
    }

    public getOneProduct(id: number): Observable<Produit> {
        return this.httpClient.get<Produit>(environment.apiURL + "/products/" + id);
    }
}
