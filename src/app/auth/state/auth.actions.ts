import { Action } from '@ngrx/store';

export enum AuthActionsTypes {
  StartAuthentication = '[Auth] Start Authentication',
  StopAuthentication = '[Auth] Stop Authentication'
}

export class StartAuthentication implements Action {
  readonly type = AuthActionsTypes.StartAuthentication;
}

export class StopAuthentication implements Action {
  readonly type = AuthActionsTypes.StopAuthentication;
}

export type AuthActions = StartAuthentication | StopAuthentication;
