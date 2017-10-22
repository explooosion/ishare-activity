import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { async } from '@angular/core/testing';
import { UserService } from '../../../service/user/user.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
@Component({
  selector: 'app-checkjoin',
  templateUrl: './checkjoin.component.html',
  styleUrls: ['./checkjoin.component.css']
})
export class CheckjoinComponent implements OnInit {

  public isyes: boolean = false;
  public result: any = "";
  @Output() onChangeVar = new EventEmitter();

  constructor(
  ) { }

  ngOnInit() {

  }

}
