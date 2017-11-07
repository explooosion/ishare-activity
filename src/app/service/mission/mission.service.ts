import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MissionService {
  constructor(
    private http: Http
  ) { }

  /**
   * 任務查詢 by ID
   * @param id
   */
  public getMission(id) {
    return this.http.get(`api/mission/${id}`)
      .map((res) => {
        return res.json() || {}
      });
  }

  /**
   * 任務查詢 by 建立者
   * @param uid
   */
  public getMissionByCreater(uid) {
    return this.http.get(`api/mission/creater/${uid}`)
      .map(res => {
        return res.json() || {}
      });
  }

  /**
   * 任務新增
   * @param body
   */
  public addMission(body) {
    return this.http.post('api/mission/add', body)
      .map((res) => {
        return res.json() || {}
      });
  }

  /**
   * 更新使用者任務
   * @param id
   */
  public updateMission(id) {
    return this.http.post('api/mission/join/update', id)
      .map((res) => {
        return res.json() || {}
      });
  }

  /**
   * 取得使用者任務 by param
   * @param param
   */
  public getJoinBy(param: Object) {
    return this.http.get(`api/mission/join?${param}`)
      .map((res) => {
        return res.json() || {}
      });
  }

  /**
   * 取得使用者任務包含任務資訊
   * @param param
   */
  public getJoinByAll(param: Object) {
    return this.http.get(`api/mission/join/all?${param}`)
      .map((res) => {
        return res.json() || {}
      });
  }

  /**
   * 新增使用者任務
   * @param body
   */
  public addJoin(body: Object) {
    return this.http.post('api/mission/join/add', body)
      .map((res) => {
        return res.json() || {}
      });
  }

  /**
   * 更新使用者任務
   * @param body
   */
  public updateJoin(body: Object) {
    return this.http.post('api/mission/join/update', body)
      .map((res) => {
        return res.json() || {}
      });
  }

  /**
   * 刪除使用者任務
   * @param id
   */
  public deleteJoin(id) {
    return this.http.post('api/mission/join/delete', id)
      .map((res) => {
        return res.json() || {}
      });
  }

  /**
   * 審核使用者
   * @param body
   */
  public verifyMission(body) {
    return this.http.post('api/mission/verify', body)
      .map((res) => {
        return res.json() || {}
      });
  }
}
