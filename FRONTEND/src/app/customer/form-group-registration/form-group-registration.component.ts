import {Component, OnInit} from '@angular/core';
import {AbstractControl, Form, FormBuilder, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from "../../password-matching-error-matcher";
import {MatDialog} from "@angular/material/dialog";
import {RecapFormComponent} from "../recap-form/recap-form.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "../../models/user.model";
import {AuthService} from "../../services/login.service";
import {Router} from "@angular/router";

export interface RecapData {
    firstName: string,
    lastName: string,
    address: string,
    city: string,
    cp: string,
    country: string,
    prefix: string,
    telephone: string,
    email: string,
    gender: string,
    username: string,
}

@Component({
    selector: 'app-form-group-registration',
    templateUrl: './form-group-registration.component.html',
    styleUrls: ['./form-group-registration.component.css']
})
export class FormGroupRegistrationComponent implements OnInit {

    checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
        let pass = group.get('password')?.value;
        let confirmPass = group.get('confirmPassword')?.value
        return pass === confirmPass ? null : {notSame: true}
    }

    phoneNumber = "388080808"
    phonePrefix = "+33"
    hidePassword = true
    hideConfirm = true

    matcher = new MyErrorStateMatcher();

    countries = [
        {name: 'France', prefix: '+33'},
        {name: 'United Kingdom', prefix: '+44'},
        {name: 'Belgium', prefix: '+32'},
        {name: 'Germany', prefix: '+49'},
        {name: 'Switzerland', prefix: '+41'},
        {name: 'Italy', prefix: '+39'},
        {name: 'Spain', prefix: '+34'},
        {name: 'United States', prefix: '+1'},
        {name: 'Canada', prefix: '+1'},

    ]

    registrationForm = this.fb.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        address: [null, Validators.required],
        city: [null, Validators.required],
        cp: [null, Validators.compose(
            [Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern('[0-9]*'),]
        )],
        country: [null, Validators.required],
        telephone: [null, Validators.compose([
            Validators.required, Validators.pattern('[0-9]{9}')
        ])],
        email: [null, Validators.compose([
            Validators.required, Validators.email
        ])],
        gender: [null, Validators.required],
        username: [null, Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9]*")])],
        password: [null, Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])],
        confirmPassword: [null, Validators.required],
    }, {validators: this.checkPasswords})

    constructor(private fb: FormBuilder, private loginService: AuthService, private sb: MatSnackBar, private route: Router) {
    }

    // openDialog() {
    //     let country: any =this.countries.find(element => element.prefix == this.registrationForm.controls['country'].value)?.name
    //     console.log(country)
    //     const DialogRef = this.dialog.open(RecapFormComponent, {
    //         data: {
    //             firstName: this.registrationForm.controls['firstName'].value,
    //             lastName: this.registrationForm.controls['lastName'].value,
    //             address: this.registrationForm.controls['address'].value,
    //             city: this.registrationForm.controls['city'].value,
    //             cp: this.registrationForm.controls['cp'].value,
    //             country: this.countries.find(element => element.prefix == this.registrationForm.controls['country'].value)?.name,
    //             prefix: this.registrationForm.controls['country'].value,
    //             telephone: this.registrationForm.controls['telephone'].value,
    //             email: this.registrationForm.controls['email'].value,
    //             gender: this.registrationForm.controls['gender'].value,
    //             username: this.registrationForm.controls['username'].value,
    //         }
    //     })
        // DialogRef.afterClosed().subscribe(result => {
        //     if(result == true)
        //     {
        //
        //         this.sb.open("Registered", "Ok")
        //     }
        // })
    // }

    ngOnInit(): void {
    }
    onSubmit(): void {
        // this.openDialog();
        let user: User = new User(
            this.registrationForm.controls['firstName'].value,
            this.registrationForm.controls['lastName'].value,
            this.registrationForm.controls['address'].value,
            this.registrationForm.controls['city'].value,
            this.registrationForm.controls['cp'].value,
            this.countries.find(element => element.prefix == this.registrationForm.controls['country'].value)!.name,
            this.registrationForm.controls['country'].value,
            this.registrationForm.controls['telephone'].value,
            this.registrationForm.controls['email'].value,
            this.registrationForm.controls['gender'].value,
            this.registrationForm.controls['username'].value,
            this.registrationForm.controls['password'].value,
        )

        this.loginService.register(user).subscribe((data) => {
            this.route.navigate(["/customer/login"])
        })
    }


}
