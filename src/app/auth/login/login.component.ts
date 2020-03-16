import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../state/app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  maxDate;
  isLoading$: Observable<boolean>;
  constructor(private authService: AuthService,
              private uiService: UIService,
              private store: Store<fromRoot.AppState>) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);

    this.form = new FormGroup({
      email: new FormControl('', {validators: [Validators.required]}),
      password: new FormControl('', {validators: [Validators.required, Validators.minLength(6)]})
    });
  }

  onLogin() {
    this.authService.login({
      email: this.form.value.email,
      password: this.form.value.password
    });
  }
}
