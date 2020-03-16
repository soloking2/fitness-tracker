import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable } from 'rxjs';
import * as fromRoot from '../../state/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuth$: Observable<boolean>;
  @Output() toggleClick = new EventEmitter();


  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.AppState>
    ) { }

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onToggle() {
    this.toggleClick.emit();
  }

  onLogout() {
    this.authService.logout();
  }

}
