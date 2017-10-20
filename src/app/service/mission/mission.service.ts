import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MissionService {
  private api: string = 'api/mission';
  constructor(private http: Http) { }
  public Getmission(index: object) {
    return this.http.get(this.api, index)
      .map((mis) => {
        return mis.json() || {}
      });
  }
  private api2: string = 'api/mission/';
  public GetmissionId(index) {
    console.log(index)
    return this.http.get(this.api2+index)
      .map((mis) => {
        return mis.json() || {}
      });
  }
}