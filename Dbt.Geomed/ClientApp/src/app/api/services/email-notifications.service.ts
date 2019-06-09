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
   * - `PriceIds`:
   *
   * - `Phone`:
   *
   * - `Lastname`:
   *
   * - `Firstname`:
   */
  NotifyCompaniesResponse(params: EmailNotificationsService.NotifyCompaniesParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (params.PriceIds || []).forEach(val => {if (val != null) __params = __params.append('PriceIds', val.toString())});
    if (params.Phone != null) __params = __params.set('Phone', params.Phone.toString());
    if (params.Lastname != null) __params = __params.set('Lastname', params.Lastname.toString());
    if (params.Firstname != null) __params = __params.set('Firstname', params.Firstname.toString());
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
   * - `PriceIds`:
   *
   * - `Phone`:
   *
   * - `Lastname`:
   *
   * - `Firstname`:
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
    PriceIds?: Array<number>;
    Phone?: string;
    Lastname?: string;
    Firstname?: string;
  }
}

export { EmailNotificationsService }
