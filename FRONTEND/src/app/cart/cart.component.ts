import { Component, OnInit } from '@angular/core';
import {Cart} from "../models/cart.model";
import {AuthService} from "../services/login.service";
import {Select, Store} from "@ngxs/store";
import {Router} from "@angular/router";
import {CartState} from "../states/cart-state";
import {Observable} from "rxjs";
import {CartService} from "../services/cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    @Select(CartState.getCart) carts: Observable<Cart[]>;

    @Select(CartState.getQte) cartLength: Observable<number>;

    @Select(CartState.getCost) costTotal: Observable<number>;

    paymentStatus: string = "nok"

    constructor(private store: Store, private authService: AuthService, private cartService: CartService, private route: Router) { }

    ngOnInit(): void {

    }

    get isAuth()
    {
        return this.authService.isAuth;
    }

   onGo()
   {
       let amount = 0
       this.costTotal.subscribe((data) => {
           amount = data
       })
       this.cartService.pay(amount).subscribe((data) => {
           this.paymentStatus = data.message
       })
   }



}
