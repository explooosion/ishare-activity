import { Component, OnInit, ViewChild } from '@angular/core';

import { SwalComponent } from '@toverux/ngsweetalert2';
import { async } from '@angular/core/testing';
import { UserService } from '../../../service/user/user.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

declare let jquery: any;
declare let $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  @ViewChild('dialogSuccess') private swalDialogSuccess: SwalComponent;
  @ViewChild('dialogError') private swalDialogError: SwalComponent;

  public userAccount: String = 'jack123';
  public userPassword: String = 'jack321';
  public userlogingroup: any;
  public types: any;
  public order: any;

  public result: any = "";
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.types = ['社福單位', '店家', '老師', '學生'];
    this.order = {
      type: 'type1'
    };
  }
  /**
   * 使用者登入
   *
   * @memberof LoginComponent
   */
  callType(value) {
    this.userlogingroup = this.types.indexOf(value) + 1;
    this.order.type = value;
  }

  public async userLogin() {


    let body = {
      userId: this.userAccount,
      userPwd: this.userPassword,
      logingroup: this.userlogingroup
    };

    await this.userService.Login(body).subscribe(
      result => {
        this.result = result[0];
        if (this.result) {
          Cookie.set('userCookie', JSON.stringify(this.result))
          this.swalDialogSuccess
            .show()
            .then((value) => { window.location.reload(); });
        } else {
          this.swalDialogError.show();
        }
      }
    )
  }
  
}
