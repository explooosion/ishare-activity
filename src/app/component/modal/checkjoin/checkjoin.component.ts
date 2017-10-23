import { Component, OnInit, Output,Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { JoinService } from '../../../service/join/join.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { InterduceComponent } from '../../../container/mission/interduce/interduce.component';

@Component({
  selector: 'app-checkjoin',
  templateUrl: './checkjoin.component.html',
  styleUrls: ['./checkjoin.component.css'],
  providers: [JoinService]
})
export class CheckjoinComponent implements OnInit {
  @Input() missionid: any;
  public isyes: boolean = false;
  public isready: boolean = false;
  public userdata: any;
  public result :any;

  public username :any;
  public verifyusername:any;
  public verifytime:any;
  public experience:any;
  public status :any;
  public  d = new Date();

  constructor(
    private router: Router,
    private joinservice: JoinService,
  ) { }

  ngOnInit() {
    this.userdata = JSON.parse(Cookie.get('userCookie'));
    console.log(Date.now());
    this.joinfind();
    
  }
  public async Update() {
    this.isready = true;
    let body ={
      childusername:this.userdata.childusername,
      missionid:this.missionid,
      verifyusername:this.verifyusername,
      verifytime:this.verifytime,
      experience:this.experience,
      status:this.status
    }
    await this.joinservice.update(body).subscribe(result=>{
      this.result =result;
    })
  }
  public async joinfind(){
    let body ="username="+this.userdata.childusername + "&" + "missionid="+this.missionid;
    await this.joinservice.joinfind(body).subscribe(result=>{
      this.result =result;
    })
  }
  public async add(){
    let body ={
      missionid :this.missionid,
      childusername:this.userdata.childusername,
      createtime:Date.now(),
      finishtime:null,
      status:'已參加',
      experience:null,
      verifytime:null,
      picture:null,
      verifyusername:null
    }
    await this.joinservice.add(body).subscribe(result=>{
      console.log(result);
      this.result=result;
      return this.result;
    })
  }
}
