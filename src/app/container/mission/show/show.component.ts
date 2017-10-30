import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JoinService } from '../../../service/join/join.service';

import { SwalComponent } from '@toverux/ngsweetalert2';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css'],
  providers: [JoinService]
})
export class ShowComponent implements OnInit {

  @ViewChild('dialogSuccess') private swalDialogSuccess: SwalComponent;
  @ViewChild('dialogError') private swalDialogError: SwalComponent;

  public userdata: Object = [];
  public missionId: Number = null;

  public missionData: any = [];
  public missionDetail: any = [];

  public filesPhoto: any = [];

  constructor(
    private router: Router,
    private joinService: JoinService
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

      await this.joinService.Getmission(this.missionId).subscribe(
        result => {
          this.missionData = result[0];
        }
      );

      let query = `username=${this.userdata['childusername']}&missionid=${this.missionId}`;
      console.log(query);
      await this.joinService.joinfind(query).subscribe(
        result => {
          this.missionDetail = result[0];
          this.missionDetail.experience = this.missionDetail.experience.replace('<br>', '\n');
        }
      );

    } else {
      console.log('查無任務資訊, 應導回首頁');
    }
  }

  /**
   * 圖片上傳增減偵測
   */
  public uploadHandler(obj) {
    // 圖片增減事件是非同步
    setTimeout(() => { this.filesPhoto = obj.files; }, 100);
  }

  public saveMissionDetail() {
    this.swalDialogSuccess.show();
    setTimeout(() => {
      this.router.navigate([`mission/interduce`], { queryParams: { id: this.missionId } });
    }, 1200);
  }

}
