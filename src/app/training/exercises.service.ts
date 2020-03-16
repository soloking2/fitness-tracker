import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { map, take } from 'rxjs/operators';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as UI from '../shared/state/ui.actions';
import * as Training from './state/training.actions';
import * as fromTraining from './state/training.reducer';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private trainingSubs: Subscription[] = [];

  constructor(private fireStore: AngularFirestore, private uiService: UIService, private store: Store<fromTraining.State>) {}

  FetchExercises() {
    this.store.dispatch(new UI.StartLoading());
    this.trainingSubs.push(this.fireStore.collection('availableExercises').snapshotChanges().pipe(
      map(docArray => {
        return docArray.map(doc => {
          const id = doc.payload.doc.id;
          const data = doc.payload.doc.data() as Exercise;
          return {
            id, ...data
          };
        });
      })
    ).subscribe(
      (exercises: Exercise[]) => {
        this.store.dispatch(new Training.SetAvailableExercises(exercises));
        this.store.dispatch(new UI.StopLoading());
      },
      error => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackBar('Fetching Message failed, please try again', null, 4000);
        this.store.dispatch(new UI.StopLoading());
      }
    ));
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveExercise).pipe(take(1)).subscribe(ex => {
    this.addDataToDatabase({...ex, date: new Date(), state: 'completed'});
    this.store.dispatch(new Training.StopTraining());
    });

  }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActiveExercise).pipe(take(1)).subscribe(ex => {
    this.addDataToDatabase({
        ...ex,
        duration: ex.duration * (progress / 100),
        calories: ex.calories * (progress / 100),
        date: new Date(),
        state: 'cancelled'
      });
    this.store.dispatch(new Training.StopTraining());
  });
  }

  getCompletedOrCancelledExercise() {
    this.trainingSubs.push(this.fireStore.collection('finishedExercise').valueChanges().subscribe(
      (exercise: Exercise[]) => {
        this.store.dispatch(new Training.SetFinishedExercises(exercise));
      }
    ));
  }

  private addDataToDatabase(exercise: Exercise) {
    this.fireStore.collection('finishedExercise').add(exercise);
  }

  cancelSubscription() {
    this.trainingSubs.forEach(sub => sub.unsubscribe());
  }
}


