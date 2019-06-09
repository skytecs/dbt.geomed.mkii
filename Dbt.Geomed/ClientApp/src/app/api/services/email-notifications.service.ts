/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
class EmailNotificationsService extends __BaseService {
  static readonly NotifyCompaniesPath = '/api/notifycompanies';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `EmailNotificationsService.NotifyCompaniesParams` containing the following parameters:
   *
   * - `UserId`:
   *
   * - `Companies`:
   */
  NotifyCompaniesResponse(params: EmailNotificationsService.NotifyCompaniesParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.UserId != null) __params = __params.set('UserId', params.UserId.toString());
    (params.Companies || []).forEach(val => {if (val != null) __params = __params.append('Companies', val.toString())});
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/notifycompanies`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `EmailNotificationsService.NotifyCompaniesParams` containing the following parameters:
   *
   * - `UserId`:
   *
   * - `Companies`:
   */
  NotifyCompanies(params: EmailNotificationsService.NotifyCompaniesParams): __Observable<null> {
    return this.NotifyCompaniesResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module EmailNotificationsService {

  /**
   * Parameters for NotifyCompanies
   */
  export interface NotifyCompaniesParams {
    UserId?: number;
    Companies?: Array<any>;
  }
}

export { EmailNotificationsService }
