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
  selector: 'app-teacher-manage',
  templateUrl: './teacher-manage.component.html',
  styleUrls: ['./teacher-manage.component.css'],
  providers: [MissionService]
})
export class TeacherManageComponent implements OnInit {

  @ViewChild('dialogPassSuccess') private swalDialogPassSuccess: SwalComponent;
  @ViewChild('dialogRejectSuccess') private swalDialogRejectSuccess: SwalComponent;

  public userdata: any = null;

  public datas: any = [];

  public page: Number = 1;
  public isLoading: Boolean = true;

  constructor(
    private router: Router,
    private missionService: MissionService
  ) { }

  ngOnInit() {
    this.userdata = JSON.parse(Cookie.get('userCookie'));
    this.getMission();
  }

  /**
   * 取得任務
   */
  public async getMission() {
    if (this.userdata.teacherusername) {

      const body = `missioncreateuser=${this.userdata.teacherusername}&&status=已提交`;

      await this.missionService.getJoinByAll(body).
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

          console.log(result);
          this.swalDialogPassSuccess.show();
          this.getMission();
        });
    }

  }

  /**
   * 退回任務
   */
  public RejectMission(mid: Number, cname: String) {
    this.swalDialogRejectSuccess.show();
  }
}
