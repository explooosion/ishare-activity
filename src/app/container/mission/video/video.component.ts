import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { MissionService } from '../../../service/mission/mission.service';

import { SwalComponent } from '@toverux/ngsweetalert2';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { IMyDpOptions } from 'mydatepicker';
import * as moment from 'moment';
import * as R from 'ramda';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
  providers: [MissionService]
})
export class VideoComponent implements OnInit {

  @ViewChild('dialogSuccess') private swalDialogSuccess: SwalComponent;
  @ViewChild('dialogError') private swalDialogError: SwalComponent;
  @ViewChild('dialogErrorCheck') private swalDialogErrorCkeck: SwalComponent;

  public userdata: Object = [];
  public missionId: Number = null;

  public missionData: any = [];
  public missionDetail: any = [];

  public missionEditMode: Boolean = false;

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    satHighlight: true,
    dayLabels: { su: '日', mo: '一', tu: '二', we: '三', th: '四', fr: '五', sa: '六' },
    monthLabels: {
      1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六',
      7: '七', 8: '八', 9: '九', 10: '十', 11: '十一', 12: '十二'
    },
    componentDisabled: false
  };

  public videoUrlFrm: any = null;

  constructor(
    private router: Router,
    private missionService: MissionService,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.userdata = JSON.parse(Cookie.get('userCookie'));
    this.getMission();
  }

  /**
     * 取得任務資訊
     */
  public async getMission() {

    this.missionId = Number(this.router.parseUrl(this.router.url).queryParams['id']);

    if (this.missionId) {

      await this.missionService.getMission(this.missionId).subscribe(
        result => {
          this.missionData = result[0];

          this.ConvertUrl();
        }
      );

      const query = `username=${this.userdata['childusername']}&missionid=${this.missionId}`;

      await this.missionService.getJoinBy(query).subscribe(
        result => {
          this.missionDetail = result[0];

          const checkStatus = R.or(
            this.missionDetail.status === '已參加',
            this.missionDetail.status === '已退回'
          );

          if (checkStatus) {
            this.missionEditMode = true;
            this.myDatePickerOptions.componentDisabled = false;
          }

          if (this.missionDetail.experience) {
            this.missionDetail.experience = this.missionDetail.experience.replace('<br>', '\n');
          }

          if (this.missionDetail.starttime) {
            this.missionDetail.starttime = {
              date: {
                year: moment(this.missionDetail.starttime).format('YYYY'),
                month: moment(this.missionDetail.starttime).format('MM'),
                day: moment(this.missionDetail.starttime).format('D'),
              }
            }
          }

        }
      );

    } else {
      console.log('查無任務資訊, 應導回首頁');
    }
  }

  /**
     * 更新任務資訊
     */
  public async saveMissionDetail() {

    let exp = this.missionDetail.experience;
    if (exp) {
      exp = this.missionDetail.experience.replace('\n', '<br>');
    }

    const body = {
      submittime: moment().format('YYYY-MM-DD hh:mm:ss'),
      starttime: this.missionDetail.starttime ? this.missionDetail.starttime.formatted : null,
      status: '已提交',
      experience: exp,
      missionid: this.missionId,
      childusername: this.userdata['childusername'],
    };

    let bodyChk = true;
    R.forEachObjIndexed((value, key) => {
      bodyChk = R.or(value === null, value === '') ? false : bodyChk;
    }, body);

    if (bodyChk) {
      await this.missionService.updateJoin(body).subscribe(
        result => {
          if (result.affectedRows > 0) {
            this.swalDialogSuccess.show();
            setTimeout(() => { location.reload(); }, 1200);
          }
        });
    } else {
      this.swalDialogErrorCkeck.show();
    }

  }



  /**
   * 網址轉換
   */
  public ConvertUrl() {
    this.videoUrlFrm = this.domSanitizer
      .bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.missionData.missionlink}`);
  }

}
