import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {
isAuth = false;
authSub: Subscription;
@Output() closeToggle = new EventEmitter<void>();
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authSub = this.authService.authSubject.subscribe(
      authStatus => this.isAuth = authStatus
    );
  }

  onClose() {
    this.closeToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }
}
