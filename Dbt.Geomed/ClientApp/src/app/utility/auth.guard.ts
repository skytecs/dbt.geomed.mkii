import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if ((currentUser && new Date(currentUser.expires) > new Date())) {
      if (currentUser.status == 0) {
        //this.router.navigate(['/home'], { queryParams: { returnUrl: state.url } });
        //logged in so return true
        return true;
      }

      if (currentUser.status == 1) {
        this.router.navigate(['confirmation-email']);
        return false;
      }
      this.router.navigate(['confirmation-required']);
      return false;
    }

    // not logged in so redirect to login page
    //this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.canActivate(childRoute, state);
  }
}
