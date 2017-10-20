import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  public missionid: any;
  constructor(
    private router: Router,
    private missionService: MissionService) { }

  ngOnInit() {
    this.missionid = this.router.url.substring(this.router.url.indexOf("=") + 1, this.router.url.length);
    this.missioncheck();
  }

  public async missioncheck() {
    let body = this.missionid;
    await this.missionService.GetmissionId(body).subscribe(
      result => {
        this.missions = result;
        console.log(this.missions);
      }
    )
  }
}