import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "../../password-matching-error-matcher";
import {AuthService} from "../../services/login.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    hidePassword = true


    registrationForm = this.fb.group({
        email: [null, Validators.required],
        password: [null, Validators.required],
    })

    constructor(private fb: FormBuilder, private loginService: AuthService, private route: Router) {
    }

    ngOnInit(): void {
    }
    onSubmit(): void {
        this.loginService.login(this.registrationForm.controls['email'].value, this.registrationForm.controls['password'].value).subscribe((data) => {
            this.loginService.isAuth = true
            localStorage.setItem('JWT', data.access_token)

            this.route.navigate(["/customer/profile"])
        })
    }


}

