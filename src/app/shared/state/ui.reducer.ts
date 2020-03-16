import {UiActions, UiActionsTypes} from './ui.actions';
import { State } from '@ngrx/store';

export interface UIState {
  isLoading: boolean;
}

export const initialize = {
  isLoading: false
};

export function uiReducer(state = initialize, action: UiActions) {
  switch (action.type) {
    case UiActionsTypes.StartLoading:
      return {
        isLoading: true
      };
    case UiActionsTypes.StopLoading:
      return {
        isLoading: false
      };
    default:
      return state;

  }
}

export const getIsLoading = (state: UIState) => state.isLoading;
