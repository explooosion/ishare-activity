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
  selector: 'app-teacher-checked',
  templateUrl: './teacher-checked.component.html',
  styleUrls: ['./teacher-checked.component.css'],
  providers: [MissionService]
})
export class TeacherCheckedComponent implements OnInit {

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

      const body = `missioncreateuser=${this.userdata.teacherusername}&&status=已審核`;

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

}
