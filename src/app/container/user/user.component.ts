import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user/user.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {
  public missions:any;
  public missionlist=[];
  public result: any;
  public userdata: any;
  constructor(
    private router: Router,
    private userService: UserService
) { }

  ngOnInit() {
    this.userdata = JSON.parse(Cookie.get('userCookie'));
    if (this.userdata.childusername != undefined) {
      this.missioncheck();
    }
  }
  public async missioncheck() {
    let body = "username=" + this.userdata.childusername;
    await this.userService.Getmission(body).subscribe(
      result => {
        this.missions = result;
        this.missionadd()            
      }
    )
  }
  public async missionadd() {
    for(let i=0;i<this.missions.length;i++){
      let body = this.missions[i].missionid;
      await this.userService.Getmissionlist(body).subscribe(
        result => {
          this.missionlist.push(result[0])
        }
      )
    }
    
    //this.missionlist = temp;
  }
}
