import { Component, OnInit, Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { JoinService } from '../../../service/join/join.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { InterduceComponent } from '../../../container/mission/interduce/interduce.component';
import * as moment from 'moment';
@Component({
  selector: 'app-checkjoin',
  templateUrl: './checkjoin.component.html',
  styleUrls: ['./checkjoin.component.css'],
  providers: [JoinService],
})
export class CheckjoinComponent implements OnInit {

@Output() onJoin =new EventEmitter();

  @Input() missionid: any;
  public date: moment.Moment;
  public Isjoin :boolean ;
  public isyes: boolean = false;
  public isready: boolean = false;
  public userdata: any;
  public result: any;

  public username: any;
  public verifyusername: any;
  public verifytime: any;
  public experience: any;
  public status: any;
  public d = new Date();

  constructor(
    private router: Router,
    private joinservice: JoinService,
  ) { }

  ngOnInit() {
    this.date = moment();
    this.userdata = JSON.parse(Cookie.get('userCookie'));
    this.joinfind();

  }

  public async joinfind() {
    let body = "username=" + this.userdata.childusername + "&" + "missionid=" + this.missionid;
    await this.joinservice.joinfind(body).subscribe(result => {
      this.result = result;
    })
  }
  public async add() {
    let body = {
      missionid: this.missionid,
      childusername: this.userdata.childusername,
      createtime: this.date.format('YYYY-MM-DD hh:mm:ss'),
      finishtime: null,
      status: '已參加',
      experience: null,
      verifytime: null,
      picture: null,
      verifyusername: null
    }
    await this.joinservice.add(body).subscribe(result => {
      this.Isjoin=true;
      this.onJoin.emit(this.Isjoin);
      this.result = result;
      return this.result;
    })
  }
}
