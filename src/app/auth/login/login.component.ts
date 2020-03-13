import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  maxDate;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
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
