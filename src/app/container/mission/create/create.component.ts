import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MissionService } from '../../../service/mission/mission.service';

import { SwalComponent } from '@toverux/ngsweetalert2';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { IMyDpOptions } from 'mydatepicker';
import * as moment from 'moment';

import { Mission } from '../.././../class/mission/mission';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [MissionService]
})
export class CreateComponent implements OnInit {

  @ViewChild('dialogSuccess') private swalDialogSuccess: SwalComponent;
  @ViewChild('dialogError') private swalDialogError: SwalComponent;
  @ViewChild('dialogErrorType') private swalDialogErrorType: SwalComponent;

  public userdata: any = null;

  public mission: Mission = new Mission();
  public missionType: Number = 0;

  // 開始時間
  public missionCreateDate: any = {
    date: {
      year: moment().format('YYYY'),
      month: moment().format('MM'),
      day: moment().add(1, 'd').format('D'),
    }
  };

  // 結束時間
  public missionFinalDate: any = {
    date: {
      year: moment().format('YYYY'),
      month: moment().format('MM'),
      day: moment().add(7, 'd').format('D'),
    }
  };

  // 開放填寫時間
  public missionExpDate: any = {
    date: {
      year: moment().format('YYYY'),
      month: moment().format('MM'),
      day: moment().add(7, 'd').format('D'),
    }
  };

  public step: Number = 0;

  public DatePickerOption: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    satHighlight: true,
    dayLabels: { su: '日', mo: '一', tu: '二', we: '三', th: '四', fr: '五', sa: '六' },
    monthLabels: {
      1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六',
      7: '七', 8: '八', 9: '九', 10: '十', 11: '十一', 12: '十二'
    },
    componentDisabled: false
  };

  constructor(
    private router: Router,
    private missionService: MissionService
  ) { }

  ngOnInit() {
    this.userdata = JSON.parse(Cookie.get('userCookie'));
    if (this.userdata) {
      this.mission.missioncreateuser = this.userdata.teacherusername;
    }
  }

  /**
   * 選擇任務類別
   */
  public ToStep1() {

    switch (this.missionType) {
      case 1: this.mission.missiontype = '影片任務'; break;
      case 2: this.mission.missiontype = '展演任務'; break;
      case 3: this.mission.missiontype = '旅遊任務'; break;
      case 4: this.mission.missiontype = '清潔任務'; break;
      case 5: this.mission.missiontype = '運動任務'; break;
      case 6: this.mission.missiontype = '美術任務'; break;
    }

    if (this.missionType !== 0) {
      this.step = 1;
      window.scroll(0, 0);
    } else {
      this.step = 0;
      this.swalDialogErrorType.show();
    }
  }

  /**
   * 填寫任務基本資訊
   */
  public ToStep2() {
    this.step = 2;
    window.scroll(0, 0);
  }

  /**
   * 個別任務項目設定
   */
  public async ToStep3() {

    this.mission.missionpicture = 'assets/activity/h7.jpg';
    this.mission.missioncreatetime = this.missionCreateDate.formatted;
    this.mission.missionfinaltime = this.missionFinalDate.formatted;
    this.mission.missionexperiencetime = this.missionExpDate.formatted;

    const body = this.mission;

    await this.missionService.addMission(body).
      subscribe(result => {
        if (result.affectedRows > 0) {
          this.swalDialogSuccess.show();
          setTimeout(() => {
            this.router.navigate([`/home`]);
          }, 1200);
        } else {
          this.swalDialogError.show();
        }
      });
  }

  public BackStep() {
    this.step = Number(this.step) - 1;
    window.scroll(0, 0);
  }
}
