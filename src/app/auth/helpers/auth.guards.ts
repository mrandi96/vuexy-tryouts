import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from 'app/auth/service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  /**
   *
   * @param {Router} _router
   * @param {AuthenticationService} _authenticationService
   */
  constructor(private _router: Router, private _authenticationService: AuthenticationService) {}

  private tokenNotExpired(name: string) {
    const token = localStorage.getItem(name);
    if (!token) return false;

    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) <= expiry;
  }

  // canActivate
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this._authenticationService.currentUserValue;
    const isNotExpired = this.tokenNotExpired('id_token');

    if (currentUser && isNotExpired) {
      // check if route is restricted by role
      if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
        // role not authorised so redirect to not-authorized page
        this._router.navigate(['/pages/miscellaneous/not-authorized']);
        return false;
      }

      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this._router.navigate(['/pages/authentication/login-v2'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
