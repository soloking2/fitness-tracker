import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../state/app.reducer';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
isAuth$: Observable<boolean>;
@Output() closeToggle = new EventEmitter<void>();
  constructor(private authService: AuthService, private store: Store<fromRoot.AppState>) { }

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onClose() {
    this.closeToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
