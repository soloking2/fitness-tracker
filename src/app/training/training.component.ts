import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromTraining from './state/training.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  ongoing$: Observable<boolean>;
  constructor(
      private store: Store<fromTraining.State>) { }

  ngOnInit(): void {
    this.ongoing$ = this.store.select(fromTraining.getIsTrainingActive);
  }

}
