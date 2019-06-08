import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthenticationService } from "../services/authentication.service";

import * as moment from 'moment';
import { filter, take, switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  auth: AuthenticationService;

  private _injector: Injector;

  private _refreshInProgress: boolean;

  private _refreshTokenSubject: BehaviorSubject<any>;

  constructor(injector: Injector) {
    this._injector = injector;

    this._refreshInProgress = false;
    this._refreshTokenSubject = new BehaviorSubject<any>(null);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.auth) {
      this.auth = this._injector.get(AuthenticationService);
    }

    const user: { token: string, expires: number, stale: number } = this.auth.getUser();

    if (!user) {
      console.debug(`anonimous ${request.url}`);

      return next.handle(request);
    }

    if (request.url.includes("account/refresh")) {
      console.debug(`refresh ${request.url}`);
      return next.handle(this.modifyRequest(request));
    }

    var edge: moment.Moment = moment(user.stale);
    //var expires: moment.Moment = moment(user.expires);

    if (edge.isAfter(moment())) {
      console.debug(`active ${request.url}`);
      return next.handle(this.modifyRequest(request));
    }

    if (this._refreshInProgress) {
      console.debug(`inProgress ${request.url}`);
      return this._refreshTokenSubject.pipe(
        filter(x => x !== null),
        take(1),
        switchMap(() => next.handle(this.modifyRequest(request))));
    }

    console.debug(`refreshing ${request.url}`);
    this._refreshInProgress = true;
    this._refreshTokenSubject.next(null);

    return this.auth
      .refresh().pipe(
        switchMap((token: string) => {
          this._refreshInProgress = false;
          this._refreshTokenSubject.next(token);

          return next.handle(this.modifyRequest(request));
        }));
  }

  private modifyRequest = (request: HttpRequest<any>) => {
    const user: { token: string, expires: number } = this.auth.getUser();

    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${user.token}`
      }
    });

  }
}
