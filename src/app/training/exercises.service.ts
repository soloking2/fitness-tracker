import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  private runningExercise: Exercise;
  availableExercises: Exercise[] = [
    {id: 'crunches', name: 'Crunches', duration: 30, calories: 1},
    {id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 1.2},
    {id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 1.5},
    {id: 'burpees', name: 'Burpees', duration: 60, calories: 8}
  ];



  getExercises() {
    return this.availableExercises.slice();
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(
      exercise => exercise.id === selectedId
    );
    this.exerciseChanged.next({... this.runningExercise});
  }
}
