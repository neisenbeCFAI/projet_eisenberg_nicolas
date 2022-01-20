import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/login.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private auth: AuthService) { }

    get authStatus() {
      return this.auth.isAuth
    }

    signOut() {
      this.auth.signOut()
    }

  ngOnInit(): void {
  }

}
