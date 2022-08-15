import { Injectable } from '@angular/core';
import {
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  UrlTree,
  Route,
  UrlSegment,
  CanActivateChild,
  CanDeactivate,
  CanLoad,
} from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/views/pages/private/auth/auth.service';
import { StorageService } from '../service/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard
  implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad
{
  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let url: string = state.url;
    return this.checkUserLogin(next, url);
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.canActivate(next, state);
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.storageService.isLoggedIn()) {
      const userRoles = this.storageService.getRoles();
      const routeRoles = route.data['roles'] as string[];
      if (routeRoles && routeRoles.length > 0) {
        if (userRoles.some((role) => routeRoles.includes(role))) {
          return true;
        }
      }

      // if user role ADMIN or DOCTOR redirect to dashboard
      if (
        userRoles.includes('ROLE_ADMIN') ||
        userRoles.includes('ROLE_DOCTOR')
      ) {
        this.router.navigate(['/admin/dashboard']);
        return false;
      }
    }

    this.router.navigate(['/']);
    return false;
  }
}
