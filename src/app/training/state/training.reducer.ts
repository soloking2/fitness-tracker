import { Exercise } from '../exercise.model';
import * as fromRoot from '../../state/app.reducer';
import {TrainingActionsTypes, TrainingActions} from './training.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface TrainingState {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  activeExercise: Exercise;
}

export interface State extends fromRoot.AppState {
  training: TrainingState;
}

export const initialize = {
  availableExercises: [],
  finishedExercises: [],
  activeExercise: null
};

export function trainingReducer(state = initialize, action: TrainingActions) {
  switch (action.type) {
    case TrainingActionsTypes.SetAvailableExercises:
      return {
        ...state,
        availableExercises: action.payload
      };
    case TrainingActionsTypes.SetFinishedExercises:
      return {
        ...state,
        finishedExercises: action.payload
      };
    case TrainingActionsTypes.StartTraining:
      return {
        ...state,
        activeExercise: {...state.availableExercises.find(ex => ex.id === action.payload)}
      };
    case TrainingActionsTypes.StopTraining:
      return {
        ...state,
        activeExercise: null
      };
    default:
      return state;
  }
}

export const getTrainingFeatureState = createFeatureSelector<TrainingState>('training');

export const getAvailableExercises = createSelector(
  getTrainingFeatureState,
  (state: TrainingState) => state.availableExercises
);

export const getFinishedExercises = createSelector(
  getTrainingFeatureState,
  (state: TrainingState) => state.finishedExercises
);

export const getActiveExercise = createSelector(
  getTrainingFeatureState,
  (state: TrainingState) => state.activeExercise
);

export const getIsTrainingActive = createSelector(
  getTrainingFeatureState,
  (state: TrainingState) => state.activeExercise != null);

