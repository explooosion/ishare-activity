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
  public isJoin: boolean;
  public ischeck: boolean = false;
  public result: any;

  public username: any;
  public userdata: any;
  public verifyusername: any;
  public verifytime: any;
  public experience: any;
  public status: any;
  constructor(
    private router: Router,
    private joinService: JoinService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userdata = JSON.parse(Cookie.get('userCookie'));
    this.route.queryParamMap.subscribe(params => {
      this.data = params;
      this.missionid = this.data.params.id;
    })
    this.missioncheck();
    this.checkstatus();
  }
  public async missioncheck() {
    let body = this.data.params.id;
    await this.joinService.Getmission(body).subscribe(
      result => {
        this.ischeck = true;
        this.missions = result;
      }
    )
  }
  public async checkstatus() {
    let body = {
      childusername: this.userdata.childusername,
      missionid: this.missionid
    }
    await this.joinService.joinfind(body).subscribe(
      result => {
        let temp = [];
        this.result = result;
        console.log(this.result);
        result.forEach(element => {
          if (body.missionid == element.missionid && element.childusername == body.childusername) {
            temp.push(element);
            if (temp[0].status == '已參加' || temp[0].status == '已審核') {
              this.isJoin = true;
              console.log(this.isJoin);
            }
          }
        })
        // let temp = [];
        // result.forEach(element => {
        //   temp.push(result.filter(function(a){
        //     console.log(this.missionid);
        //   }));
        // });
        // if (this.status == "已參加" || this.status == "已審核") {
        //   console.log(1);
        //   this.isJoin = true;
        // }
        // else {
        //   console.log(2);
        //   this.isJoin = false;
        // }
      })
  }


  public onJoin(e) {
    this.isJoin = e;
  }
}