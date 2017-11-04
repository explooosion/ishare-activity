import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MissionService {
  constructor(
    private http: Http
  ) { }

  /**
   * 任務列表
   *
   * @param {any} id
   * @returns
   * @memberof MissionService
   */
  public getMission(id) {
    return this.http.get(`api/mission/${id}`)
      .map((res) => {
        return res.json() || {}
      });
  }

  /**
   * 任務更新
   *
   * @param {any} id
   * @returns
   * @memberof MissionService
   */
  public updateMission(id) {
    return this.http.post('api/mission/join/update', id)
      .map((res) => {
        return res.json() || {}
      });
  }

  /**
   * 尋找使用者參加的任務(條件查詢)
   *
   * @param {Object} param
   * @returns
   * @memberof MissionService
   */
  public getJoinBy(param: Object) {
    return this.http.get(`api/mission/join?${param}`)
      .map((res) => {
        return res.json() || {}
      });
  }

  /**
   * 新增使用者參加的任務
   *
   * @param {Object} body
   * @returns
   * @memberof MissionService
   */
  public addJoin(body: Object) {
    return this.http.post('api/mission/join/add', body)
      .map((res) => {
        return res.json() || {}
      });
  }

  /**
 * 更新使用者參加的任務
 *
 * @param {Object} body
 * @returns
 * @memberof MissionService
 */
  public updateJoin(body: Object) {
    return this.http.post('api/mission/join/update', body)
      .map((res) => {
        return res.json() || {}
      });
  }

  /**
 * 刪除使用者參加的任務
 *
 * @param {any} id
 * @returns
 * @memberof MissionService
 */
  public deleteJoin(id) {
    return this.http.post('api/mission/join/delete', id)
      .map((res) => {
        return res.json() || {}
      });
  }
}
