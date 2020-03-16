import { Component, OnInit} from '@angular/core';
import { TrainingService } from '../exercises.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromTraining from '../state/training.reducer';
import * as fromRoot from '../../state/app.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;
  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
    this.fetchExercise();
  }

  fetchExercise() {
    this.trainingService.FetchExercises();
  }

  onStartTraining(f: NgForm) {
    this.trainingService.startExercise(f.value.exercise);
  }

}
