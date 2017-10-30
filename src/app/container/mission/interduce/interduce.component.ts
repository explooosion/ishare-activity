import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { async } from '@angular/core/testing';

import { JoinService } from '../../../service/join/join.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-interduce',
  templateUrl: './interduce.component.html',
  styleUrls: ['./interduce.component.css'],
  providers: [JoinService]
})
export class InterduceComponent implements OnInit {

  public missions: any = [];
  public missionid: any;
  public data: any = [];
  public isJoin: boolean = false;
  public isFinish: boolean = false;
  public ischeck: boolean = false;
  public userdata: any;
  public result: any;

  constructor(
    private router: Router,
    private joinService: JoinService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userdata = JSON.parse(Cookie.get('userCookie'));
    this.getMission();   //將任務內容顯示
    this.chkMission();    //判斷是否參加與完成心得填寫
  }

  public async getMission() {

    this.route.queryParamMap.subscribe(params => {
      this.data = params;
      this.missionid = this.data.params.id;
    })

    let body = this.data.params.id;
    await this.joinService.Getmission(body).subscribe(
      result => {
        this.ischeck = true;
        this.missions = result;
      }
    )
  }

  public async chkMission() {
    let body = "username=" + this.userdata.childusername + "&missionid=" + this.missionid
    await this.joinService.joinfind(body).subscribe(
      result => {
        if (result.length != 0) {
          this.isJoin = true;

          // 給了這條件, 我就不能修改心得了, 要刪除
          // if (result[0].experience == null) {
          this.isFinish = true
          // }
        }
      })
  }

  public onJoin(e) {
    this.isJoin = e;
  }


  /**
   * 填寫心得（根據ID選擇不同任務心得）
   *
   * @param {Number} id
   * @memberof InterduceComponent
   */
  public btnExperience() {

    let url = null;

    // 有些多的心得組件要刪除
    switch (this.missions[0].missiontype) {
      case '影片任務': url = 'video'; break;
      case '展演任務': url = 'show'; break;
      case '旅遊任務': url = 'travel'; break;
      case '清潔任務': url = 'clean'; break;
      case '運動任務': url = 'sport'; break;
      case '美術任務': url = 'art'; break;
    }

    if (url != null) {
      this.router.navigate([`mission/${url}`], { queryParams: { id: this.missionid } });
    } else {
      // 照理說不該ERROR（除非用戶亂改網址）
      // location.reload();
      alert('url is null');
    }

  }

}
