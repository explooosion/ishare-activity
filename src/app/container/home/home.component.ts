import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare let jquery: any;
declare let $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    $('.carousel').carousel({
      interval: 2500
    })
  }

  public btnMissionbicycle() {
    this.router.navigate(['mission/bicycle']);
  }
  public btnMissionsport() {
    this.router.navigate(['mission/sport']);
  }
  public btnSearch(){
    this.router.navigate(['search']);
  }
  public btnMissioninformation(){
    this.router.navigate(['mission/information']);
  }
  public btnMissionart(){
    this.router.navigate(['mission/art']);
  }
  public btnMissionclean(){
    this.router.navigate(['mission/clean']);
  }
  public btnMissionoutclean(){
    this.router.navigate(['mission/outclean']);
  }
}
