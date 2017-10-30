import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  public videoName: String = '';
  public videoExp: String = '';
  public videoUrl: any = 'Z5ztoOdXkEY';
  public videoUrlFrm: any;

  constructor(
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {

    // 處理網址問題
    this.ConvertUrl();
  }

  public ConvertUrl() {
    this.videoUrlFrm = this.domSanitizer
      .bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoUrl}`);
  }

}
