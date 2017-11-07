import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MissionService } from '../../service/mission/mission.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { async } from '@angular/core/testing';
import { element } from 'protractor';

import * as R from 'ramda';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [MissionService]
})
export class UserComponent implements OnInit {

  public missions: any;
  public missionStart = [];
  public missionVerify = [];
  public missionFinish = [];
  public missionReject = [];
  public missionAll = [];
  public result: any;
  public userdata: any;

  constructor(
    private router: Router,
    private missionService: MissionService
  ) { }

  ngOnInit() {
    this.userdata = JSON.parse(Cookie.get('userCookie'));
    if (this.userdata.childusername !== undefined) {
      this.missionGet();
    }
  }

  /**
   * 取得使用者任務清單包含任務基本資料
   */
  public async missionGet() {
    const body = `username=${this.userdata.childusername}`;
    await this.missionService.getJoinByAll(body).subscribe(
      result => {
        this.missionAll = result;
        this.missionStart = R.filter(
          r => r.status === '已參加', this.missionAll
        );
        this.missionVerify = R.filter(
          r => r.status === '已提交', this.missionAll
        );
        this.missionFinish = R.filter(
          r => r.status === '已審核', this.missionAll
        );
        this.missionReject = R.filter(
          r => r.status === '已退回', this.missionAll
        );
      });
  }

}
