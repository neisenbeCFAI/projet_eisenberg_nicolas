import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from "@angular/material/icon";
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CatalogueComponent} from './catalogue/catalogue.component';
import {FilterPipe} from "./pipe/filter-pipe";
import {RouterModule, Routes} from "@angular/router";
import {NotFoundComponent} from './not-found/not-found.component';
import {CartComponent} from './cart/cart.component';
import {DetailComponent} from './detail/detail.component';
import {NgxsModule} from "@ngxs/store";
import {CartState} from "./states/cart-state";
import {ProductComponent} from './product/product.component';
import {ApiHttpInterceptor} from "./interceptor/http-interceptor";
import {environment} from "../environments/environment";
import { CartProductComponent } from './cart-product/cart-product.component';

const appRoutes: Routes = [
    {
        path: "customer",
        loadChildren: () => import('./customer/customer.module').then((m) => m.CustomerModule),
    },
    {
        path: "",
        component: CatalogueComponent
    },
    {
        path: "detail/:id",
        component: DetailComponent
    },
    {
        path: "cart",
        component: CartComponent
    },
    {
        path: "**",
        component: NotFoundComponent
    }
]


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        CatalogueComponent,
        NotFoundComponent,
        CartComponent,
        FilterPipe,
        DetailComponent,
        ProductComponent,
        CartProductComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatRadioModule,
        MatSidenavModule,
        MatCardModule,
        MatDialogModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        MatIconModule,
        MatListModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot(appRoutes),
        NgxsModule.forRoot([CartState], { developmentMode: !environment.production }),
        RouterModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiHttpInterceptor,
            multi: true
        },
        {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
