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
  selector: 'app-teacher-create',
  templateUrl: './teacher-create.component.html',
  styleUrls: ['./teacher-create.component.css'],
  providers: [MissionService]
})
export class TeacherCreateComponent implements OnInit {

  @ViewChild('dialogDeleteError') private swalDialogDeleteSuccess: SwalComponent;
  @ViewChild('dialogDeleteError') private swalDialogDeleteError: SwalComponent;

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
    if (this.userdata.logingroup !== 3) {
      this.router.navigate(['/home']);
    }
    this.getMission();
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

  /**
   * 刪除任務
   */
  public DeleteMission() {
    this.swalDialogDeleteError.show();
  }
}
