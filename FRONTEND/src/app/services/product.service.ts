import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Produit } from 'src/app/models/produit';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    // TODO: Use that one instead of monserv.service, cleaner

    URL_ENDPOINT_PRODUCTS: string = "/products/" as const;

    constructor(private http: HttpClient) { }

    getProduct(): Observable<Produit[]> {
        return this.http.get<Produit[]>(environment.apiURL + this.URL_ENDPOINT_PRODUCTS);
    }

    getSingleProduct(id: number): Observable<Produit> {
        return this.http.get<Produit>(environment.apiURL + this.URL_ENDPOINT_PRODUCTS + id);
    }
}
