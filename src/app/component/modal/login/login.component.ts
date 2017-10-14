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

  public userAccount: String = '';
  public userPassword: String = '';
  public userloginbar: Number;
  public result: any = "";
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    
  }
  /**
   * 使用者登入
   *
   * @memberof LoginComponent
   */
  public userLogin() {

    const vailid = this.userAccount == 'user' && this.userPassword == '123456' ? true : false;

    let body = {
      loginbar: 2,
      userId: this.userAccount,
      userPwd: this.userPassword,
    };
    this.userService.Login(body).subscribe(
      result => {
        this.result = result[0];
        console.log(this.userloginbar);
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
