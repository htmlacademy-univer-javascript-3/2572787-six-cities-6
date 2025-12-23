import { State } from '../../types/state';
import AuthorizationStatus from '../../const/authorization-status';

export const getAuthorizationStatus = (state: Pick<State, 'auth'>) =>
  state.auth.authorizationStatus;

export const getIsAuth = (state: Pick<State, 'auth'>) =>
  state.auth.authorizationStatus === AuthorizationStatus.Auth;
