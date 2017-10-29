import { Component, OnInit, Input } from '@angular/core';
import { JoinService } from '../../../service/join/join.service';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
  providers: [JoinService]
})
export class ExperienceComponent implements OnInit {

  public result: any;
  public user: any;
  public experience: any;
  @Input() missionid: string;

  constructor(
    private router: Router,
    private joinService: JoinService,
  ) { }

  ngOnInit() {
    this.user = JSON.parse(Cookie.get('userCookie'));
  }
  public async UpdateExperience() {
    let body = {
      missionid: this.missionid,
      childusername: this.user.childusername,
      experience: this.experience
    };
    await this.joinService.update(body).subscribe(
      result => {
        console.log(result);
      }
    )
    this.router.navigate['mission/' + this.missionid];
  }

}
