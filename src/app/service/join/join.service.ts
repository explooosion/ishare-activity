import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class JoinService {

  constructor(private http: Http) { }
  private api1: string = 'api/mission/join/update';
  public update(index) {
    return this.http.post(this.api1, index)
      .map((mis) => {
        return mis.json() || {}
      });
  }
  private api2: string = 'api/mission/join?';
  public joinfind(body) {
    console.log(this.api2 + body)
    return this.http.get(this.api2 + body)
      .map((mis) => {
        return mis.json() || {}
      });

  }
  private api3: string = 'api/mission/join/add';
  public add(body) {
    console.log(this.api3,body)
    return this.http.post(this.api3 , body)
      .map((mis) => {
        return mis.json() || {}
      });

  }

}
