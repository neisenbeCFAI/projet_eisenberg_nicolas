import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import { FormGroupRegistrationComponent } from './form-group-registration/form-group-registration.component';
import { RecapFormComponent } from './recap-form/recap-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from "@angular/material/icon";
import {PhonePipe} from "../pipe/phone-pipe";
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {NgxsModule} from "@ngxs/store";
import {CartState} from "../states/cart-state";

const appChild: Routes = [
    {
        path: "signup",
        component: FormGroupRegistrationComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "profile",
        component: RecapFormComponent
    },
]


@NgModule({
    declarations: [
        FormGroupRegistrationComponent,
        RecapFormComponent,
        LoginComponent,
        PhonePipe,
    ],
    imports: [
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
        RouterModule.forChild(appChild),
    ],
    providers: [
        {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
    ],
})
export class CustomerModule {
}
