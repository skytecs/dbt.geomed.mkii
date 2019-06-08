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
class ApiOrganizationsService extends __BaseService {
  static readonly GetOrganizationsPath = '/api/organizations';
  static readonly GetOrganizationPath = '/api/organizations/{id}';
  static readonly GetOrganization_1Path = '/api/organizations/matrix';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }
  GetOrganizationsResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/organizations`,
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
  }  GetOrganizations(): __Observable<null> {
    return this.GetOrganizationsResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   */
  GetOrganizationResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/organizations/${id}`,
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
   * @param id undefined
   */
  GetOrganization(id: number): __Observable<null> {
    return this.GetOrganizationResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ApiOrganizationsService.GetOrganization_1Params` containing the following parameters:
   *
   * - `lng`:
   *
   * - `lat`:
   */
  GetOrganization_1Response(params: ApiOrganizationsService.GetOrganization_1Params): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.lng != null) __params = __params.set('lng', params.lng.toString());
    if (params.lat != null) __params = __params.set('lat', params.lat.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/organizations/matrix`,
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
   * @param params The `ApiOrganizationsService.GetOrganization_1Params` containing the following parameters:
   *
   * - `lng`:
   *
   * - `lat`:
   */
  GetOrganization_1(params: ApiOrganizationsService.GetOrganization_1Params): __Observable<null> {
    return this.GetOrganization_1Response(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module ApiOrganizationsService {

  /**
   * Parameters for GetOrganization_1
   */
  export interface GetOrganization_1Params {
    lng?: number;
    lat?: number;
  }
}

export { ApiOrganizationsService }
