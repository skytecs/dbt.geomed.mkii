/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { CompanyViewModel } from '../models/company-view-model';
import { GoogleDistanceMatrixResult } from '../models/google-distance-matrix-result';
@Injectable({
  providedIn: 'root',
})
class ApiOrganizationsService extends __BaseService {
  static readonly GetOrganizationsPath = '/api/organizations';
  static readonly UpdateOrganizationPath = '/api/organizations';
  static readonly CreateOrganizationPath = '/api/organizations';
  static readonly GetOrganizationPath = '/api/organizations/{id}';
  static readonly GetOrganization_1Path = '/api/organizations/matrix';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  GetOrganizationsResponse(): __Observable<__StrictHttpResponse<Array<CompanyViewModel>>> {
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
        return _r as __StrictHttpResponse<Array<CompanyViewModel>>;
      })
    );
  }
  /**
   * @return Success
   */
  GetOrganizations(): __Observable<Array<CompanyViewModel>> {
    return this.GetOrganizationsResponse().pipe(
      __map(_r => _r.body as Array<CompanyViewModel>)
    );
  }

  /**
   * @param params The `ApiOrganizationsService.UpdateOrganizationParams` containing the following parameters:
   *
   * - `UserId`:
   *
   * - `Name`:
   *
   * - `Lng`:
   *
   * - `Lat`:
   *
   * - `Id`:
   *
   * - `Email`:
   *
   * - `Address`:
   *
   * @return Success
   */
  UpdateOrganizationResponse(params: ApiOrganizationsService.UpdateOrganizationParams): __Observable<__StrictHttpResponse<CompanyViewModel>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.UserId != null) __params = __params.set('UserId', params.UserId.toString());
    if (params.Name != null) __params = __params.set('Name', params.Name.toString());
    if (params.Lng != null) __params = __params.set('Lng', params.Lng.toString());
    if (params.Lat != null) __params = __params.set('Lat', params.Lat.toString());
    if (params.Id != null) __params = __params.set('Id', params.Id.toString());
    if (params.Email != null) __params = __params.set('Email', params.Email.toString());
    if (params.Address != null) __params = __params.set('Address', params.Address.toString());
    let req = new HttpRequest<any>(
      'PUT',
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
        return _r as __StrictHttpResponse<CompanyViewModel>;
      })
    );
  }
  /**
   * @param params The `ApiOrganizationsService.UpdateOrganizationParams` containing the following parameters:
   *
   * - `UserId`:
   *
   * - `Name`:
   *
   * - `Lng`:
   *
   * - `Lat`:
   *
   * - `Id`:
   *
   * - `Email`:
   *
   * - `Address`:
   *
   * @return Success
   */
  UpdateOrganization(params: ApiOrganizationsService.UpdateOrganizationParams): __Observable<CompanyViewModel> {
    return this.UpdateOrganizationResponse(params).pipe(
      __map(_r => _r.body as CompanyViewModel)
    );
  }

  /**
   * @param params The `ApiOrganizationsService.CreateOrganizationParams` containing the following parameters:
   *
   * - `UserId`:
   *
   * - `Name`:
   *
   * - `Lng`:
   *
   * - `Lat`:
   *
   * - `Id`:
   *
   * - `Email`:
   *
   * - `Address`:
   *
   * @return Success
   */
  CreateOrganizationResponse(params: ApiOrganizationsService.CreateOrganizationParams): __Observable<__StrictHttpResponse<CompanyViewModel>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.UserId != null) __params = __params.set('UserId', params.UserId.toString());
    if (params.Name != null) __params = __params.set('Name', params.Name.toString());
    if (params.Lng != null) __params = __params.set('Lng', params.Lng.toString());
    if (params.Lat != null) __params = __params.set('Lat', params.Lat.toString());
    if (params.Id != null) __params = __params.set('Id', params.Id.toString());
    if (params.Email != null) __params = __params.set('Email', params.Email.toString());
    if (params.Address != null) __params = __params.set('Address', params.Address.toString());
    let req = new HttpRequest<any>(
      'POST',
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
        return _r as __StrictHttpResponse<CompanyViewModel>;
      })
    );
  }
  /**
   * @param params The `ApiOrganizationsService.CreateOrganizationParams` containing the following parameters:
   *
   * - `UserId`:
   *
   * - `Name`:
   *
   * - `Lng`:
   *
   * - `Lat`:
   *
   * - `Id`:
   *
   * - `Email`:
   *
   * - `Address`:
   *
   * @return Success
   */
  CreateOrganization(params: ApiOrganizationsService.CreateOrganizationParams): __Observable<CompanyViewModel> {
    return this.CreateOrganizationResponse(params).pipe(
      __map(_r => _r.body as CompanyViewModel)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  GetOrganizationResponse(id: number): __Observable<__StrictHttpResponse<CompanyViewModel>> {
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
        return _r as __StrictHttpResponse<CompanyViewModel>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  GetOrganization(id: number): __Observable<CompanyViewModel> {
    return this.GetOrganizationResponse(id).pipe(
      __map(_r => _r.body as CompanyViewModel)
    );
  }

  /**
   * @param params The `ApiOrganizationsService.GetOrganization_1Params` containing the following parameters:
   *
   * - `lng`:
   *
   * - `lat`:
   *
   * @return Success
   */
  GetOrganization_1Response(params: ApiOrganizationsService.GetOrganization_1Params): __Observable<__StrictHttpResponse<GoogleDistanceMatrixResult>> {
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
        return _r as __StrictHttpResponse<GoogleDistanceMatrixResult>;
      })
    );
  }
  /**
   * @param params The `ApiOrganizationsService.GetOrganization_1Params` containing the following parameters:
   *
   * - `lng`:
   *
   * - `lat`:
   *
   * @return Success
   */
  GetOrganization_1(params: ApiOrganizationsService.GetOrganization_1Params): __Observable<GoogleDistanceMatrixResult> {
    return this.GetOrganization_1Response(params).pipe(
      __map(_r => _r.body as GoogleDistanceMatrixResult)
    );
  }
}

module ApiOrganizationsService {

  /**
   * Parameters for UpdateOrganization
   */
  export interface UpdateOrganizationParams {
    UserId?: number;
    Name?: string;
    Lng?: number;
    Lat?: number;
    Id?: number;
    Email?: string;
    Address?: string;
  }

  /**
   * Parameters for CreateOrganization
   */
  export interface CreateOrganizationParams {
    UserId?: number;
    Name?: string;
    Lng?: number;
    Lat?: number;
    Id?: number;
    Email?: string;
    Address?: string;
  }

  /**
   * Parameters for GetOrganization_1
   */
  export interface GetOrganization_1Params {
    lng?: number;
    lat?: number;
  }
}

export { ApiOrganizationsService }
