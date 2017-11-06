import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MissionService } from '../../../service/mission/mission.service';

import { SwalComponent } from '@toverux/ngsweetalert2';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { IMyDpOptions } from 'mydatepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css'],
  providers: [MissionService]
})
export class ShowComponent implements OnInit {

  @ViewChild('dialogSuccess') private swalDialogSuccess: SwalComponent;
  @ViewChild('dialogError') private swalDialogError: SwalComponent;

  public userdata: Object = [];
  public missionId: Number = null;

  public missionData: any = [];
  public missionDetail: any = [];

  public missionEditMode: Boolean = false;
  public missionPhotoList: any = [];

  public filesPhoto: any = [];

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

  constructor(
    private router: Router,
    private missionService: MissionService
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
        }
      );

      const query = `username=${this.userdata['childusername']}&missionid=${this.missionId}`;

      await this.missionService.getJoinBy(query).subscribe(
        result => {
          this.missionDetail = result[0];
          if (this.missionDetail.status === '已參加') {
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

          if (this.missionDetail.picture) {
            this.missionPhotoList = String(this.missionDetail.picture).split(';');
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
      starttime: this.missionDetail.starttime.formatted,
      status: '已提交',
      experience: exp,
      picture: './assets/activity/h1.jpg;./assets/activity/h1.jpg',
      missionid: this.missionId,
      childusername: this.userdata['childusername'],
    };

    await this.missionService.updateJoin(body).subscribe(
      result => {
        if (result.affectedRows > 0) {
          this.swalDialogSuccess.show();
          setTimeout(() => { location.reload(); }, 1200);
        }
      });

  }

  /**
   * 圖片上傳增減偵測
   */
  public uploadHandler(obj) {
    // 圖片增減事件是非同步
    setTimeout(() => { this.filesPhoto = obj.files; }, 100);
  }
}
