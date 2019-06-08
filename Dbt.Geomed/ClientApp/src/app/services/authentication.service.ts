import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map'
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  public authorized(): boolean {
    return !!localStorage.getItem("currentUser");
  }

  login(email: string, password: string) {
    return this.http.post<any>('/api/account/authenticate', { email: email, password: password }).pipe(
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
    return this.http.post<any>('/api/account/register', { email: email, password: password, firstname: firstname, lastname: lastname }).pipe(
      map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }

  resetPassword(email: string, captcha: string): Observable<any> {
    return this.http.post("/api/account/resetpassword", { email, captcha });
  }

  refresh() {
    return this.http.post<any>('/api/account/refresh', {})
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

  isAdmin(): Observable<boolean> {
    return this.http.post<boolean>("api/account/isadmin", {});
  }
}
