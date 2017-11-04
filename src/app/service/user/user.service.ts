import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  public Login(body: object) {
    return this.http.post('api/user/login', body)
      .map((res) => {
        return res.json() || {}
      });
  }

  public Getmission(body) {
    return this.http.get('api/mission/join?' + body)
      .map((res) => {
        return res.json() || {}
      });
  }

  public Getmissionlist(body) {
    return this.http.get('api/mission/' + body)
      .map((res) => {
        return res.json() || {}
      });
  }
}
