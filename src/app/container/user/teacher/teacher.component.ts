import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MissionService } from '../../../service/mission/mission.service';

import { SwalComponent } from '@toverux/ngsweetalert2';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { IMyDpOptions } from 'mydatepicker';
import * as moment from 'moment';
import * as R from 'ramda';
import { async } from '@angular/core/testing';
import { element } from 'protractor';
import * as swal from 'sweetalert2';
import { Stream } from 'stream';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css'],
  providers: [MissionService]
})
export class TeacherComponent implements OnInit {

  @ViewChild('dialogDeleteError') private swalDialogDeleteSuccess: SwalComponent;
  @ViewChild('dialogDeleteError') private swalDialogDeleteError: SwalComponent;

  @ViewChild('dialogPassSuccess') private swalDialogPassSuccess: SwalComponent;
  @ViewChild('dialogRejectSuccess') private swalDialogRejectSuccess: SwalComponent;
  @ViewChild('dialogRevertSuccess') private swalDialogRevertSuccess: SwalComponent;

  public userdata: any = null;

  public datas: any = [];
  public datasAll: any = [];
  public datasVerify: any = [];
  public datasFinish: any = [];
  public datasReject: any = [];

  public tab: Number = 0;
  public page: Number = 1;
  public isLoading: Boolean = true;

  constructor(
    private router: Router,
    private missionService: MissionService
  ) { }

  ngOnInit() {
    this.userdata = JSON.parse(Cookie.get('userCookie'));
    if (this.userdata.logingroup !== 3) {
      this.router.navigate(['/home']);
    }

    // Default Tab
    this.tab = Number(this.router.parseUrl(this.router.url).queryParams['tab']);

    this.getMission();
    this.getMissionAll();
  }

  /**
   * 取得已發佈的任務
   */
  public async getMission() {
    if (this.userdata.teacherusername) {
      await this.missionService.getMissionByCreater(this.userdata.teacherusername).
        subscribe(result => {

          this.datas = result;
          // Sort Data by id desc
          const reg = R.sortWith([
            R.descend(R.prop('id'))
          ]);
          this.datas = reg(this.datas);
          this.isLoading = false;
        });
    }
  }

  /**
   * 取得學童任務
   */
  public async getMissionAll() {
    if (this.userdata.teacherusername) {

      const body = `missioncreateuser=${this.userdata.teacherusername}`;

      await this.missionService.getJoinByAll(body).
        subscribe(result => {

          this.datasAll = result;

          // Sort Data by id desc
          const reg = R.sortWith([
            R.descend(R.prop('id'))
          ]);
          this.datasAll = reg(this.datasAll);

          // Filter Data by status
          this.datasVerify = R.filter(
            r => r.status === '已提交', this.datasAll
          );
          this.datasFinish = R.filter(
            r => r.status === '已審核', this.datasAll
          );
          this.datasReject = R.filter(
            r => r.status === '已退回', this.datasAll
          );

          this.isLoading = false;
        });
    }
  }


  /**
   * 批改心得
   * @param mid 任務編號
   * @param mtype 任務類別
   * @param cuid 學童帳號
   */
  public correctMission(mid: Number, mtype: String, cuid: String) {
    let url = null;
    // 有些多的心得組件要刪除
    switch (mtype) {
      case '影片任務': url = 'video'; break;
      case '展演任務': url = 'show'; break;
      case '旅遊任務': url = 'travel'; break;
      case '清潔任務': url = 'clean'; break;
      case '運動任務': url = 'sport'; break;
      case '美術任務': url = 'art'; break;
    }
    this.router.navigate([`mission/${url}`], { queryParams: { id: mid, childusername: cuid } });
  }

  /**
   * 通過任務
   * @param mid 任務編號
   * @param cuid 學童帳號
   */
  public async PassMission(mid: Number, cuid: String) {
    if (this.userdata) {
      const body = {
        status: '已審核',
        verifytime: moment().format('YYYY-MM-DD hh:mm:ss'),
        verifyusername: this.userdata.teacherusername,
        missionid: mid,
        childusername: cuid
      };
      await this.missionService.verifyMission(body)
        .subscribe(result => {
          if (result.affectedRows > 0) {
            this.swalDialogPassSuccess.show();
            this.getMissionAll();
          }
        });
    }
  }

  /**
   * 退回任務
   * @param mid 任務編號
   * @param cuid 學童帳號
   */
  public async RejectMission(mid: Number, cuid: String) {
    if (this.userdata) {
      const body = {
        status: '已退回',
        verifytime: moment().format('YYYY-MM-DD hh:mm:ss'),
        verifyusername: this.userdata.teacherusername,
        missionid: mid,
        childusername: cuid
      };
      await this.missionService.verifyMission(body)
        .subscribe(result => {
          console.log(result);
          if (result.affectedRows > 0) {
            this.swalDialogRejectSuccess.show();
            this.getMissionAll();
          }
        });
    }
  }

  /**
   * 還原任務(轉為待審)
   * @param mid 任務編號
   * @param cuid 學童帳號
   */
  public async RevertMission(mid: Number, cuid: String) {
    if (this.userdata) {
      const body = {
        status: '已提交',
        verifytime: moment().format('YYYY-MM-DD hh:mm:ss'),
        verifyusername: this.userdata.teacherusername,
        missionid: mid,
        childusername: cuid
      };
      await this.missionService.verifyMission(body)
        .subscribe(result => {
          console.log(result);
          if (result.affectedRows > 0) {
            this.swalDialogRevertSuccess.show();
            this.getMissionAll();
          }
        });
    }
  }

  /**
   * 刪除任務
   */
  public DeleteMission() {
    this.getMission();
    this.swalDialogDeleteError.show();
  }
}
