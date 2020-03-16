import { Action } from '@ngrx/store';
import { Exercise } from '../exercise.model';

export enum TrainingActionsTypes {
  SetAvailableExercises = '[Training] Set Available Exercises',
  SetFinishedExercises = '[Training] Set Finished Exercises',
  StartTraining = '[Training] Start Training',
  StopTraining = '[Training] Stop Training'
}

export class SetAvailableExercises implements Action {
  readonly type = TrainingActionsTypes.SetAvailableExercises;
  constructor(public payload: Exercise[]) {}
}

export class SetFinishedExercises implements Action {
  readonly type = TrainingActionsTypes.SetFinishedExercises;

  constructor(public payload: Exercise[]) {}
}

export class StartTraining implements Action {
  readonly type = TrainingActionsTypes.StartTraining;

  constructor(public payload: string) {}
}

export class StopTraining implements Action {
  readonly type = TrainingActionsTypes.StopTraining;
}

export type TrainingActions =
SetAvailableExercises
| SetFinishedExercises
| StartTraining
| StopTraining;
