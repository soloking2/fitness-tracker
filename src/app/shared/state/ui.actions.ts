import { Action } from '@ngrx/store';

export enum UiActionsTypes {
  StartLoading = '[UI] Start Loading',
  StopLoading = '[UI] Stop Loading'
}

export class StartLoading implements Action {
  readonly type = UiActionsTypes.StartLoading;
}

export class StopLoading implements Action {
  readonly type = UiActionsTypes.StopLoading;
}


export type UiActions = StartLoading | StopLoading;
