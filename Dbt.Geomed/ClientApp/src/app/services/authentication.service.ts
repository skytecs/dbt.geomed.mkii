import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AccountService } from '../api/services';

@Injectable()
export class AuthenticationService {
  constructor(private api: AccountService) { }

  public authorized(): boolean {
    return !!localStorage.getItem("currentUser");
  }

  login(email: string, password: string) {
    return this.api.Authenticate({ email: email, password: password }).pipe(
      map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }

  register(firstname: string, lastname: string, email: string, password: string) {
    return this.api.Register({ email: email, password: password, firstname: firstname, lastname: lastname }).pipe(
      map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }

  refresh() {
    return this.api.Refresh()
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes

            localStorage.setItem('currentUser', JSON.stringify(user));

            return user.token;

          } else {
            this.logout();
          }

          return null;
        }),
        catchError(val => {
          this.logout();
          throw val;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  getUser = (): { token: string, expires: number, stale: number } => {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

}
