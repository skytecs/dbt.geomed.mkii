/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { PricesViewModel } from '../models/prices-view-model';
import { CategoriesListViewModel } from '../models/categories-list-view-model';
import { CartPricesViewModel } from '../models/cart-prices-view-model';
@Injectable({
  providedIn: 'root',
})
class ApiServicesService extends __BaseService {
  static readonly GetServicesListPath = '/api/services';
  static readonly GetCompanyServicesInfoPath = '/api/services';
  static readonly GetCategoriesListPath = '/api/categories';
  static readonly GetCartPricesPath = '/api/cartprices';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `ApiServicesService.GetServicesListParams` containing the following parameters:
   *
   * - `ServiceIds`:
   *
   * - `Lng`:
   *
   * - `Lat`:
   *
   * @return Success
   */
  GetServicesListResponse(params: ApiServicesService.GetServicesListParams): __Observable<__StrictHttpResponse<PricesViewModel>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (params.ServiceIds || []).forEach(val => {if (val != null) __params = __params.append('ServiceIds', val.toString())});
    if (params.Lng != null) __params = __params.set('Lng', params.Lng.toString());
    if (params.Lat != null) __params = __params.set('Lat', params.Lat.toString());
    let req = new HttpRequest<any>(
      'GET',
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
        return _r as __StrictHttpResponse<PricesViewModel>;
      })
    );
  }
  /**
   * @param params The `ApiServicesService.GetServicesListParams` containing the following parameters:
   *
   * - `ServiceIds`:
   *
   * - `Lng`:
   *
   * - `Lat`:
   *
   * @return Success
   */
  GetServicesList(params: ApiServicesService.GetServicesListParams): __Observable<PricesViewModel> {
    return this.GetServicesListResponse(params).pipe(
      __map(_r => _r.body as PricesViewModel)
    );
  }

  /**
   * @param params The `ApiServicesService.GetCompanyServicesInfoParams` containing the following parameters:
   *
   * - `ServiceIds`:
   *
   * - `Lng`:
   *
   * - `Lat`:
   *
   * @return Success
   */
  GetCompanyServicesInfoResponse(params: ApiServicesService.GetCompanyServicesInfoParams): __Observable<__StrictHttpResponse<PricesViewModel>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (params.ServiceIds || []).forEach(val => {if (val != null) __params = __params.append('ServiceIds', val.toString())});
    if (params.Lng != null) __params = __params.set('Lng', params.Lng.toString());
    if (params.Lat != null) __params = __params.set('Lat', params.Lat.toString());
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
        return _r as __StrictHttpResponse<PricesViewModel>;
      })
    );
  }
  /**
   * @param params The `ApiServicesService.GetCompanyServicesInfoParams` containing the following parameters:
   *
   * - `ServiceIds`:
   *
   * - `Lng`:
   *
   * - `Lat`:
   *
   * @return Success
   */
  GetCompanyServicesInfo(params: ApiServicesService.GetCompanyServicesInfoParams): __Observable<PricesViewModel> {
    return this.GetCompanyServicesInfoResponse(params).pipe(
      __map(_r => _r.body as PricesViewModel)
    );
  }

  /**
   * @return Success
   */
  GetCategoriesListResponse(): __Observable<__StrictHttpResponse<CategoriesListViewModel>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/categories`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CategoriesListViewModel>;
      })
    );
  }
  /**
   * @return Success
   */
  GetCategoriesList(): __Observable<CategoriesListViewModel> {
    return this.GetCategoriesListResponse().pipe(
      __map(_r => _r.body as CategoriesListViewModel)
    );
  }

  /**
   * @param priceIds undefined
   * @return Success
   */
  GetCartPricesResponse(priceIds?: Array<number>): __Observable<__StrictHttpResponse<CartPricesViewModel>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (priceIds || []).forEach(val => {if (val != null) __params = __params.append('priceIds', val.toString())});
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/cartprices`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CartPricesViewModel>;
      })
    );
  }
  /**
   * @param priceIds undefined
   * @return Success
   */
  GetCartPrices(priceIds?: Array<number>): __Observable<CartPricesViewModel> {
    return this.GetCartPricesResponse(priceIds).pipe(
      __map(_r => _r.body as CartPricesViewModel)
    );
  }
}

module ApiServicesService {

  /**
   * Parameters for GetServicesList
   */
  export interface GetServicesListParams {
    ServiceIds?: Array<number>;
    Lng?: number;
    Lat?: number;
  }

  /**
   * Parameters for GetCompanyServicesInfo
   */
  export interface GetCompanyServicesInfoParams {
    ServiceIds?: Array<number>;
    Lng?: number;
    Lat?: number;
  }
}

export { ApiServicesService }
