import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MissionService {
  constructor(private http: Http) { }

  private api2 :string ='api/mission/join/update';
  public update(index) {
    return this.http.post(this.api2 ,index)
      .map((mis) => {
        return mis.json() || {}
      });
  }
  private api4: string = 'api/mission/';
  public Getmission(index) {
    return this.http.get(this.api4 + index)
      .map((mis) => {
        return mis.json() || {}
      });
  }
}