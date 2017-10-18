import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MissionService } from '../../../service/mission/mission.service';
@Component({
  selector: 'app-interduce',
  templateUrl: './interduce.component.html',
  styleUrls: ['./interduce.component.css'],
  providers: [MissionService]
})
export class InterduceComponent implements OnInit {
  public missionpic: Object = [];
  public missiontitle: Object = [];
  public missiontype: Object = [];
  public result: any = "";
  public missions: any = [];
  constructor(
    private router: Router,
    private missionService: MissionService) { }

  ngOnInit() {
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
        console.log(result);
        x.forEach(element => {
          temp.push(result.filter(function (x) {
            return x.missiontype == element;

          }));
        });
        this.missions = temp;
      }
    )
  }
}