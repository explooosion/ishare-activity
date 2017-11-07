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

  public userdata: any = null;

  public datas: any = [];
  public datasAll: any = [];      // 所有任務
  public datasVerify: any = [];   // 待審核 
  public datasFinish: any = [];   // 已審核
  public datasReject: any = [];   // 轉退回

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
   * 取得任務
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
   * 刪除任務
   */
  public DeleteMission() {
    this.swalDialogDeleteError.show();
  }


  /**
   * 通過任務
   */
  public async PassMission(mid: Number, cname: String) {

    if (this.userdata) {
      const body = {
        status: '已審核',
        verifytime: moment().format('YYYY-MM-DD hh:mm:ss'),
        verifyusername: this.userdata.teacherusername,
        missionid: mid,
        childusername: cname
      };
      await this.missionService.verifyMission(body)
        .subscribe(result => {
          if (result.affectedRows > 0) {
            this.swalDialogPassSuccess.show();
            this.getMission();
          }
        });
    }

  }

  /**
   * 退回任務
   */
  public async RejectMission(mid: Number, cname: String) {

    if (this.userdata) {
      const body = {
        status: '已退回',
        verifytime: moment().format('YYYY-MM-DD hh:mm:ss'),
        verifyusername: this.userdata.teacherusername,
        missionid: mid,
        childusername: cname
      };
      await this.missionService.verifyMission(body)
        .subscribe(result => {
          console.log(result);
          if (result.affectedRows > 0) {
            this.swalDialogRejectSuccess.show();
            this.getMission();
          }
        });
    }

  }
}
