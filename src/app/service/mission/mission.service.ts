import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MissionService {
  private api: string = 'api/mission/';
  constructor(private http: Http) { }
  public Getmission(index) {
    return this.http.get(this.api + index)
      .map((mis) => {
        return mis.json() || {}
      });
  }
  private api2 :string ='api/mission/join/update';
  public update(index) {
    return this.http.post(this.api2 ,index)
      .map((mis) => {
        return mis.json() || {}
      });
  }
}