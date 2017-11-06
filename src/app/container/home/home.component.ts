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

  public missiontype: Object = [];

  public isLoading: Boolean = true;
  public missions: Object = [];
  public missionssit: Object = [];
  public missionssit2: Object = [];

  constructor(
    private router: Router,
    private missionService: MissionService,
  ) { }

  ngOnInit() {
    this.missionLoad();
    $('.carousel').carousel({
      interval: 2500
    });

  }

  /**
   * 載入所有任務
   *
   * @memberof HomeComponent
   */
  public async missionLoad() {

    const body = '';

    await this.missionService.getMission(body).subscribe(
      result => {

        const arr = [
          '影片任務',
          '展演任務',
          '旅遊任務',
          '清潔任務',
          '運動任務',
          '美術任務'
        ];

        const temp = [];

        arr.forEach(element => {
          temp.push(result.filter(function (r) {
            return r.missiontype === element;
          }));
        });

        this.missions = temp;
        console.log(this.missions);
        this.missionssit = temp[0].slice(0, 1);
        this.missionssit2 = temp[0].slice(1, 5);

        this.isLoading = false;

      }
    )
  }

}
