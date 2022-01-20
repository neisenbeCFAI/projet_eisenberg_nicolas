import { Component, OnInit } from '@angular/core';
import { Produit } from "../models/produit";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngxs/store";
import {MonservService} from "../monserv.service";
import {AddProduct} from "../actions/addProduct.actions";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

    produit: Produit = new Produit(0, "", 0, "", "");

    constructor(private route: ActivatedRoute, private productService: MonservService, private store: Store) { }

    ngOnInit(): void {
        this.productService.getOneProduct(this.route.snapshot.params['id']).subscribe(
            (product: Produit) => {
                this.produit = product;
            }
        );
    }

    addProduct() {
        if(this.produit)
            this.store.dispatch(new AddProduct(this.produit));
    }

}
