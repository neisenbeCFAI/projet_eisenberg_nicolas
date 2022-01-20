import {Component, Input, OnInit} from '@angular/core';
import {CartComponent} from "../cart/cart.component";
import {AddProduct} from "../actions/addProduct.actions";
import {RemoveProduct} from "../actions/removeProduct.actions";
import {Store} from "@ngxs/store";
import {RemoveOneProduct} from "../actions/removeOneProduct.actions";
import {Cart} from "../models/cart.model";
import {Produit} from "../models/produit";

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css']
})
export class CartProductComponent implements OnInit {

    @Input()
    cart: Cart;

    Qte = 0;

    constructor(private store: Store, private cartView: CartComponent) { }

    ngOnInit(): void {
    }

    updateData(): void {
        this.cartView.ngOnInit();
    }

    getCount() : number {
        return this.cart.Qte * this.cart.product.price;
    }

    removeItem(product: Produit): void{
        this.store.dispatch(new RemoveOneProduct(this.cart.product));
        this.updateData();
    }

    addItem(product: Produit): void {
        this.store.dispatch(new AddProduct(this.cart.product));
        this.updateData();
    }

    removeProduct(product: Produit) : void {
        this.store.dispatch(new RemoveProduct(this.cart.product));
        this.updateData();
    }

}
