import { Component, OnInit, ViewChild } from '@angular/core';
import { SwalComponent } from '@toverux/ngsweetalert2';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})
export class TravelComponent implements OnInit {


  @ViewChild('dialogSuccess') private swalDialogSuccess: SwalComponent;
  @ViewChild('dialogError') private swalDialogError: SwalComponent;

  constructor() { }

  ngOnInit() {
  }

  public photoUploader(e) {
    console.log(e);
    // 請寫 UploadService

    if (e.files.length > 0) {
      // 判斷使用者群組
      this.swalDialogSuccess.show();

    } else {
      this.swalDialogError.show();
    }
  }
}
