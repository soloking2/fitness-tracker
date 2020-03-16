import { Injectable } from '@angular/core';
import { User, AuthData } from './user.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import { TrainingService } from '../training/exercises.service';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../state/app.reducer';
import * as UI from '../shared/state/ui.actions';
import * as Auth from './state/auth.actions';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private trainingService: TrainingService,
              private uiService: UIService,
              private store: Store<fromRoot.AppState>) {}

  initAuthListener() {
    this.afAuth.authState.subscribe(
      user => {
        if (user) {
          this.store.dispatch(new Auth.StartAuthentication());
          this.router.navigate(['/training']);
        } else {
          this.trainingService.cancelSubscription();
          this.store.dispatch(new Auth.StopAuthentication());
          this.router.navigate(['/login']);
        }
      }
    );
  }

  registerUser(authdata: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth.createUserWithEmailAndPassword(authdata.email, authdata.password)
    .then(result => {
      console.log(result);
      this.store.dispatch(new UI.StopLoading());
    }).catch(
      error => {
        this.store.dispatch({type: 'STOP_LOADING'});
        this.uiService.showSnackBar(error.message, null, 4000);

      }
    );
  }

  login(authdata: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth.signInWithEmailAndPassword(authdata.email, authdata.password)
    .then(success => {
      console.log(success);
      this.store.dispatch(new UI.StopLoading());
    })
    .catch(error => {
      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackBar(error.message, null, 4000);
      });
  }

  logout() {
    this.afAuth.auth.signOut();

  }
}
