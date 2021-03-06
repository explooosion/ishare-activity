import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { async } from '@angular/core/testing';

import { MissionService } from '../../../service/mission/mission.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { SwalComponent } from '@toverux/ngsweetalert2';

import * as moment from 'moment';
import * as R from 'ramda';

@Component({
  selector: 'app-introduce',
  templateUrl: './introduce.component.html',
  styleUrls: ['./introduce.component.css'],
  providers: [MissionService]
})
export class IntroduceComponent implements OnInit {

  @ViewChild('dialogIsLogin') private swalDialogIsLogin: SwalComponent;
  @ViewChild('dialogSuccess') private swalDialogSuccess: SwalComponent;
  @ViewChild('dialogError') private swalDialogError: SwalComponent;
  @ViewChild('dialogDelSuccess') private swalDialogDelSuccess: SwalComponent;
  @ViewChild('dialogDelError') private swalDialogDelError: SwalComponent;

  public missions: any = undefined;
  public missionId: any = null;
  public missionJoin: any = null;

  public userdata: any = null;
  public userGroup: Number = 0;

  public isJoin: Boolean = false;
  public isFinish: Boolean = false;
  public ischeck: Boolean = false;

  constructor(
    private router: Router,
    private missionService: MissionService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.userdata = JSON.parse(Cookie.get('userCookie'));
    if (this.userdata) {
      this.userGroup = this.userdata.logingroup;
    }
    this.getMission();   // 將任務內容顯示
    this.chkMission();    // 判斷是否參加與完成心得填寫
  }

  /**
   * 取得任務資訊
   */
  public async getMission() {

    this.missionId = Number(this.router.parseUrl(this.router.url).queryParams['id']);

    await this.missionService.getMission(this.missionId).subscribe(
      result => {
        this.missions = result[0];
        this.ischeck = true;
      }
    );
  }

  /**
   * 參加任務
   */
  public async addJoin() {
    if (this.userdata) {
      const body = {
        missionid: this.missionId,
        childusername: this.userdata.childusername,
        createtime: moment().format('YYYY-MM-DD hh:mm:ss'),
      }
      await this.missionService.addJoin(body).subscribe(
        result => {
          if (result.affectedRows > 0) {
            this.swalDialogSuccess.show();
            setTimeout(() => {
              location.reload();
            }, 1200);
          } else {
            this.swalDialogError.show();
          }
        });
    } else {
      this.swalDialogIsLogin.show();
    }
  }

  public async deleteJoin() {
    if (this.missionId && this.userdata) {
      const body = {
        missionid: this.missionId,
        childusername: this.userdata.childusername
      }
      await this.missionService.deleteJoin(body).subscribe(
        result => {
          if (result.affectedRows > 0) {
            this.swalDialogDelSuccess.show();
            setTimeout(() => {
              location.reload();
            }, 1200);
          } else {
            this.swalDialogDelError.show();
          }
        });
    }
  }

  /**
   * 檢查是否已經參加任務
   */
  public async chkMission() {
    if (this.userdata) {
      const body = 'username=' + this.userdata.childusername + '&missionid=' + this.missionId
      await this.missionService.getJoinBy(body).subscribe(
        result => {
          if (result.length > 0) {
            this.missionJoin = result[0];
            this.isJoin = true;
          }
        });
    }
  }

  /**
   * 填寫心得（根據ID選擇不同任務心得）
   */
  public btnExperience() {

    let url = null;

    // 有些多的心得組件要刪除
    switch (this.missions.missiontype) {
      case '影片任務': url = 'video'; break;
      case '展演任務': url = 'show'; break;
      case '旅遊任務': url = 'travel'; break;
      case '清潔任務': url = 'clean'; break;
      case '運動任務': url = 'sport'; break;
      case '美術任務': url = 'art'; break;
    }

    if (url != null) {
      this.router.navigate([`mission/${url}`], { queryParams: { id: this.missionId } });
    } else {
      console.log(this.missions.missiontype);
    }

  }

}
