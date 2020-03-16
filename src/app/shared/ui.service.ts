import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class UIService {
  loadStateChange = new Subject<boolean>();
  constructor(private snackbar: MatSnackBar) {}

  showSnackBar(message, action, duration) {
    this.snackbar.open(message, action, {
      duration
    });

  }
}

