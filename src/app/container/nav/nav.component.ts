import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../service/user/user.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

declare let jquery: any;
declare let $: any;
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public IsLogin: boolean = false;
  public readyLogin:boolean =true;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.readyLogin=true;
    this.IsLogin=false;
    this.CheckLogin();
  }

  public CheckLogin() {
    let cookies = JSON.parse(Cookie.get('userCookie'));
    if (cookies) {
      this.IsLogin = true;
      this.readyLogin=false;
    }
    else {
      this.IsLogin = false;
      this.readyLogin=true;
    }
  }
  public LoginOut(){
    Cookie.delete('userCookie');
    this.IsLogin=false;
    this.readyLogin=true;
    this.router.navigate(["/storelogin"]);
  }
  public btnMissioncreate() {
    this.router.navigate(['mission/create']);
  }
}
