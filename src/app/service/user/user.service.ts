import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  private api: string = 'api/user/login';
  constructor(private http: Http) { }

  public Login(body: object) {
    return this.http.post(this.api, body)
      .map((res) => {
        return res.json() || {}

      });
  }
  private api2: string = 'api/mission/join?';
  public Getmission(body) {
    return this.http.get(this.api2 + body)
      .map((res) => {
        return res.json() || {}
      });
  }
  private api3: string = 'api/mission/';
  public Getmissionlist(body) {
    return this.http.get(this.api3 + body)
      .map((res) => {
        return res.json() || {}
      });
  }
}
