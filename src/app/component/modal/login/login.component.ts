import { Component, OnInit, ViewChild } from '@angular/core';

import { SwalComponent } from '@toverux/ngsweetalert2';
import { async } from '@angular/core/testing';

declare let jquery: any;
declare let $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('dialogSuccess') private swalDialogSuccess: SwalComponent;
  @ViewChild('dialogError') private swalDialogError: SwalComponent;

  public userAccount: String = '';
  public userPassword: String = '';

  constructor() { }

  ngOnInit() {
  }

  /**
   * 使用者登入
   *
   * @memberof LoginComponent
   */
  public userLogin() {

    const vailid = this.userAccount == 'user' && this.userPassword == '123456' ? true : false;

    if (vailid) {
      this.swalDialogSuccess
        .show()
        .then((value) => { window.location.reload(); });
    } else {
      this.swalDialogError.show();
    }

  }


}
