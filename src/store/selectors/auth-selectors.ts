import { State } from '../../types/state';
import AuthorizationStatus from '../../const/authorization-status';

export const getAuthorizationStatus = (state: State) =>
  state.auth.authorizationStatus;

export const getIsAuth = (state: State) =>
  state.auth.authorizationStatus === AuthorizationStatus.Auth;

export const getIsUnknown = (state: State) =>
  state.auth.authorizationStatus === AuthorizationStatus.Unknown;

export const getIsNoAuth = (state: State) =>
  state.auth.authorizationStatus === AuthorizationStatus.NoAuth;
