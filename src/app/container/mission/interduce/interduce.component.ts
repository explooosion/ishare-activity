import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JoinService } from '../../../service/join/join.service';
import { async } from '@angular/core/testing';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-interduce',
  templateUrl: './interduce.component.html',
  styleUrls: ['./interduce.component.css'],
  providers: [JoinService],


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
    this.missioncheck();   //將任務內容顯示
    this.checkstatus();    //判斷是否參加與完成心得填寫
  }
  public async missioncheck() {
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
  public async checkstatus() {
    let body = "username=" + this.userdata.childusername + "&missionid=" + this.missionid
    await this.joinService.joinfind(body).subscribe(
      result => {
        if (result.length != 0) { this.isJoin = true; if (result[0].experience == null) { this.isFinish = true } }
      })
  }
  public onJoin(e) {
    this.isJoin = e;
  }
  public btnMissionart() {
    this.router.navigate(['mission/experience']);
  }
}