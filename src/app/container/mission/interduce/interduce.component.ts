import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MissionService } from '../../../service/mission/mission.service';
@Component({
  selector: 'app-interduce',
  templateUrl: './interduce.component.html',
  styleUrls: ['./interduce.component.css'],
  providers: [MissionService]
})
export class InterduceComponent implements OnInit {
  public missions: any = [];
  public missionid: any;
  public data: any = [];
  public ischeck: boolean = false;
  constructor(
    private router: Router,
    private missionService: MissionService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.data = params;
      this.missionid =this.data.params.id;
    })
    this.missioncheck();
  }

  public async missioncheck() {
    let body = this.data.params.id;
    await this.missionService.Getmission(body).subscribe(
      result => {
        this.ischeck = true;
        this.missions = result;
      }
    )
  }
}