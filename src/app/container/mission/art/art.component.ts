import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MissionService } from '../../../service/mission/mission.service';

import { SwalComponent } from '@toverux/ngsweetalert2';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { IMyDpOptions } from 'mydatepicker';
import * as moment from 'moment';
import * as R from 'ramda';

@Component({
  selector: 'app-art',
  templateUrl: './art.component.html',
  styleUrls: ['./art.component.css'],
  providers: [MissionService]
})
export class ArtComponent implements OnInit {


  @ViewChild('dialogSuccess') private swalDialogSuccess: SwalComponent;
  @ViewChild('dialogError') private swalDialogError: SwalComponent;
  @ViewChild('dialogErrorCheck') private swalDialogErrorCkeck: SwalComponent;

  public userdata: Object = [];
  public missionId: Number = null;

  public missionData: any = [];
  public missionDetail: any = [];

  public missionEditMode: Boolean = false;
  public missionPhotoList: any = [];

  public filesPhoto: any = [];

  public artType: Object = {};

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
          }

          if (this.missionDetail.experience) {
            this.missionDetail.experience = this.missionDetail.experience.replace('<br>', '\n');
          }

          if (this.missionDetail.picture) {
            this.missionPhotoList = String(this.missionDetail.picture).split(';');
          }

          if (this.missionDetail.arttype) {
            this.artType = this.missionDetail.arttype;
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
      arttype: JSON.stringify(this.artType),
      status: '已提交',
      experience: exp,
      picture: './assets/activity/h1.jpg;./assets/activity/h1.jpg',
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
   * 圖片上傳增減偵測
   */
  public uploadHandler(obj) {
    // 圖片增減事件是非同步
    setTimeout(() => { this.filesPhoto = obj.files; }, 100);
  }
}
