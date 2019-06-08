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
class ApiServicesService extends __BaseService {
  static readonly GetCompanyServicesInfoPath = '/api/services';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param ServiceIds undefined
   */
  GetCompanyServicesInfoResponse(ServiceIds?: Array<number>): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (ServiceIds || []).forEach(val => {if (val != null) __params = __params.append('ServiceIds', val.toString())});
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/services`,
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
   * @param ServiceIds undefined
   */
  GetCompanyServicesInfo(ServiceIds?: Array<number>): __Observable<null> {
    return this.GetCompanyServicesInfoResponse(ServiceIds).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module ApiServicesService {
}

export { ApiServicesService }
