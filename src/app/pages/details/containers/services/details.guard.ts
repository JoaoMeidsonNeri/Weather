import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, UrlTree } from '@angular/router';

@Injectable()
export class DetailsGuard  {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    if (route.queryParams.lat && route.queryParams.lon) {
      return true;
    }
    return this.router.createUrlTree(['']);
  }
}