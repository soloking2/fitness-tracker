import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth = false;
  authSub: Subscription;
  @Output() toggleClick = new EventEmitter();


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authSub = this.authService.authSubject.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  onToggle() {
    this.toggleClick.emit();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

}
