import {Component, Input, OnInit} from '@angular/core';
import { Produit } from 'src/app/models/produit';
import {Store} from "@ngxs/store";
import {AddProduct} from "../actions/addProduct.actions";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

    @Input()
    Produit: Produit = new Produit(0, "",0,"","");

    constructor(private store: Store) { }

    ngOnInit(): void {

    }

    addProduct() {
        this.store.dispatch(new AddProduct(this.Produit));
    }
}
