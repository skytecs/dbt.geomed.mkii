/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { LoggedInAccountModel } from '../models/logged-in-account-model';
import { AuthModel } from '../models/auth-model';
import { RegisterModel } from '../models/register-model';
@Injectable({
  providedIn: 'root',
})
class AccountService extends __BaseService {
  static readonly AuthenticatePath = '/api/Account/Authenticate';
  static readonly RefreshPath = '/api/Account/Refresh';
  static readonly RegisterPath = '/api/Account/Register';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param model undefined
   * @return Success
   */
  AuthenticateResponse(model?: AuthModel): __Observable<__StrictHttpResponse<LoggedInAccountModel>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = model;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Account/Authenticate`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<LoggedInAccountModel>;
      })
    );
  }
  /**
   * @param model undefined
   * @return Success
   */
  Authenticate(model?: AuthModel): __Observable<LoggedInAccountModel> {
    return this.AuthenticateResponse(model).pipe(
      __map(_r => _r.body as LoggedInAccountModel)
    );
  }

  /**
   * @return Success
   */
  RefreshResponse(): __Observable<__StrictHttpResponse<LoggedInAccountModel>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Account/Refresh`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<LoggedInAccountModel>;
      })
    );
  }
  /**
   * @return Success
   */
  Refresh(): __Observable<LoggedInAccountModel> {
    return this.RefreshResponse().pipe(
      __map(_r => _r.body as LoggedInAccountModel)
    );
  }

  /**
   * @param model undefined
   * @return Success
   */
  RegisterResponse(model?: RegisterModel): __Observable<__StrictHttpResponse<LoggedInAccountModel>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = model;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Account/Register`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<LoggedInAccountModel>;
      })
    );
  }
  /**
   * @param model undefined
   * @return Success
   */
  Register(model?: RegisterModel): __Observable<LoggedInAccountModel> {
    return this.RegisterResponse(model).pipe(
      __map(_r => _r.body as LoggedInAccountModel)
    );
  }
}

module AccountService {
}

export { AccountService }
