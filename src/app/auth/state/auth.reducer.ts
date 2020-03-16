import {AuthActions, AuthActionsTypes} from './auth.actions';

export interface AuthState {
  isAuthenticated: boolean;
}

export const initialize = {
  isAuthenticated: false
};

export function authReducer(state = initialize, action: AuthActions) {
  switch (action.type) {
    case AuthActionsTypes.StartAuthentication:
      return {
        isAuthenticated: true
      };
    case AuthActionsTypes.StopAuthentication:
      return {
        isAuthenticated: false
      };
    default:
      return state;
  }
}

export const getIsAuthentication = (state: AuthState) => state.isAuthenticated;
