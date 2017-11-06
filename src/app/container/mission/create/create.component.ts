import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MissionService } from '../../../service/mission/mission.service';

import { SwalComponent } from '@toverux/ngsweetalert2';
import { IMyDpOptions } from 'mydatepicker';
import * as moment from 'moment';

import { Mission } from '../.././../class/mission/mission';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [MissionService]
})
export class CreateComponent implements OnInit {


  @ViewChild('dialogSuccess') private swalDialogSuccess: SwalComponent;
  @ViewChild('dialogError') private swalDialogError: SwalComponent;
  @ViewChild('dialogErrorType') private swalDialogErrorType: SwalComponent;

  public mission: Mission = new Mission();
  public missionType: Number = 0;

  public step: Number = 0;

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    satHighlight: true,
    dayLabels: { su: '日', mo: '一', tu: '二', we: '三', th: '四', fr: '五', sa: '六' },
    monthLabels: {
      1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六',
      7: '七', 8: '八', 9: '九', 10: '十', 11: '十一', 12: '十二'
    },
    componentDisabled: false
  };

  constructor(
    private router: Router,
    private missionService: MissionService
  ) { }

  ngOnInit() {

  }

  /**
   * 選擇任務類別
   */
  public ChooseGroup() {

    switch (this.missionType) {
      case 1: this.mission.missiontype = '影片任務'; break;
      case 2: this.mission.missiontype = '展演任務'; break;
      case 3: this.mission.missiontype = '旅遊任務'; break;
      case 4: this.mission.missiontype = '清潔任務'; break;
      case 5: this.mission.missiontype = '運動任務'; break;
      case 6: this.mission.missiontype = '美術任務'; break;
    }

    if (this.missionType !== 0) {
      this.step = 1;
    } else {
      this.step = 0;
      this.swalDialogErrorType.show();
    }
  }

  /**
   * 發佈任務
   */
  public PublishMission() {
    this.swalDialogSuccess.show();
    // 導到老師所建立的任務清單頁面
  }

}
