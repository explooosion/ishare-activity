import { Component, OnInit, ViewChild } from '@angular/core';

import { SwalComponent } from '@toverux/ngsweetalert2';
import { UserService } from '../../../service/user/user.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  @ViewChild('dialogSuccess') private swalDialogSuccess: SwalComponent;
  @ViewChild('dialogError') private swalDialogError: SwalComponent;
  @ViewChild('dialogErrorGroup') private swalDialogErrorGroup: SwalComponent;

  public userAccount: String = 'jason123';
  public userPassword: String = '123456';
  public logingroup: Number = 0;
  public result: any = '';

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
  public async userLogin() {

    if (this.logingroup === 0) {
      this.swalDialogErrorGroup.show();
    } else {

      const body = {
        userId: this.userAccount,
        userPwd: this.userPassword,
        logingroup: this.logingroup
      };

      await this.userService.Login(body).subscribe(
        result => {
          this.result = result[0];
          if (this.result) {

            // 判斷使用者群組
            this.result.logingroup = this.logingroup;

            Cookie.set('userCookie', JSON.stringify(this.result))
            this.swalDialogSuccess.show();

            setTimeout(() => { window.location.reload(); }, 1200);

          } else {
            this.swalDialogError.show();
          }
        }
      )

    }

  }

}
