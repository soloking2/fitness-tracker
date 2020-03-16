import * as fromUi from '../shared/state/ui.reducer';
import * as fromAuth from '../auth/state/auth.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface AppState {
  ui: fromUi.UIState;
  auth: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  ui: fromUi.uiReducer,
  auth: fromAuth.authReducer
};

export const getUiState = createFeatureSelector<fromUi.UIState>('ui');

export const getAuthState = createFeatureSelector<fromAuth.AuthState>('auth');
export const getIsLoading = createSelector(
  getUiState,
  fromUi.getIsLoading
);

export const getIsAuth = createSelector(
  getAuthState,
  fromAuth.getIsAuthentication
);


