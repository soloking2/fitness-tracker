import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad } from '@angular/router';
import { Injectable } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import * as fromRoot from '../state/app.reducer';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

@Injectable()

export class AuthGuard implements CanActivate, CanLoad {

  constructor(private router: Router, private store: Store<fromRoot.AppState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(fromRoot.getIsAuth);
  }

  canLoad(route: Route) {
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));
}

}
