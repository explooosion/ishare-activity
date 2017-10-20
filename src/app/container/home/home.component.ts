import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MissionService } from '../../service/mission/mission.service';

declare let jquery: any;
declare let $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MissionService]
})
export class HomeComponent implements OnInit {
  public missionpic: Object = [];
  public missiontitle: Object = [];
  public missiontype: Object = [];
  public organizertitle: object = [];
  public organizerimg: object = [];
  public result: any = "";
  public missions: any = [];
  public missionssit: any = [];
  public missionssit2: any = [];
  constructor(
    private router: Router,
    private missionService: MissionService,
  ) { }

  ngOnInit() {

    this.missioncheck();
    $('.carousel').carousel({
      interval: 2500
    })
  }
  // 主辦單位
  public async organizer() {
    let body = {
      organizertitle: this.organizertitle,
    };
  }

  public async missioncheck() {
    let body = {
    };
    await this.missionService.Getmission(body).subscribe(
      result => {
        let x = [
          '展演講座',
          '影片任務',
          '展演任務',
          '旅遊任務',
          '清潔任務',
          '運動任務',
          '美術任務',
        ];
        let temp = [];
        x.forEach(element => {
          temp.push(result.filter(function (x) {
            return x.missiontype == element;
          }));
        });
        this.missions = temp;
        this.missionssit = temp[0].slice(0, 1);
        this.missionssit2 = temp[0].slice(1, 5);
      }
    )
  }

  public btnMissionbicycle() {
    this.router.navigate(['mission/bicycle']);
  }
  public btnMissionsport() {
    this.router.navigate(['mission/sport']);
  }
  public btnSearch() {
    this.router.navigate(['search']);
  }
  public btnMissioninformation() {
    this.router.navigate(['mission/information']);
  }
  public btnMissionart() {
    this.router.navigate(['mission/art']);
  }
  public btnMissionclean() {
    this.router.navigate(['mission/clean']);
  }
  public btnMissionoutclean() {
    this.router.navigate(['mission/outclean']);
  }
  public btnMissionoutourplay() {
    this.router.navigate(['mission/tourplay']);
  }
  public btnMissionouplaytour() {
    this.router.navigate(['mission/playtour']);
  }
  public btnMissionoujoinexhibition() {
    this.router.navigate(['mission/join-exhibition']);
  }
  public btnMissionovisithibition() {
    this.router.navigate(['mission/visit-exhibition']);
  }
}
