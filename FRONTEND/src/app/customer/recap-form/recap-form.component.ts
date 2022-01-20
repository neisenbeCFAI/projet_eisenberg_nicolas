import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {RecapData} from "../form-group-registration/form-group-registration.component";
import {User} from "../../models/user.model";
import {AuthService} from "../../services/login.service";

@Component({
  selector: 'app-recap-form',
  templateUrl: './recap-form.component.html',
  styleUrls: ['./recap-form.component.css']
})
export class RecapFormComponent implements OnInit {

    user: User = new User("", "", "", "", "", "", "", "", "", "", "", "")

  constructor(private loginService: AuthService) {
  }

  ngOnInit(): void {
        this.loginService.me().subscribe((data) => {
            this.user = data
        })
  }

}
