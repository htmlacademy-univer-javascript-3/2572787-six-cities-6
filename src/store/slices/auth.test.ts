import auth, { updateAuthorizationStatus } from './auth';
import AuthorizationStatus from '../../const/authorization-status';
import { checkUserToken, loginUser, logoutUser } from '../api-actions';
import {
  mockUserCredentialsInfo,
  mockUserInfo,
} from '../../test-utils/mocks';

describe('Auth Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
    };

    const result = auth(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Unknown,
    };

    const result = auth(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should update authorization status with "updateAuthorizationStatus" action', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
    };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
    };

    const result = auth(
      initialState,
      updateAuthorizationStatus({ status: AuthorizationStatus.Auth }),
    );

    expect(result).toEqual(expectedState);
  });

  it('should set Auth authorization status with "checkUserToken.fulfilled" action with payload', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
    };
    const mockUser = mockUserInfo();
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
    };

    const result = auth(
      initialState,
      checkUserToken.fulfilled(mockUser, '', undefined),
    );

    expect(result).toEqual(expectedState);
  });

  it('should set NoAuth authorization status with "checkUserToken.fulfilled" action without payload', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
    };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
    };

    const result = auth(
      initialState,
      checkUserToken.fulfilled(null, '', undefined),
    );

    expect(result).toEqual(expectedState);
  });

  it('should set Auth authorization status with "loginUser.fulfilled" action with payload', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
    };
    const mockCredentials = mockUserCredentialsInfo();
    const mockUser = mockUserInfo();
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
    };

    const result = auth(
      initialState,
      loginUser.fulfilled(mockUser, '', mockCredentials),
    );

    expect(result).toEqual(expectedState);
  });

  it('should set NoAuth authorization status with "loginUser.fulfilled" action without payload', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
    };
    const mockCredentials = mockUserCredentialsInfo();
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
    };

    const result = auth(
      initialState,
      loginUser.fulfilled(null, '', mockCredentials),
    );

    expect(result).toEqual(expectedState);
  });

  it('should set NoAuth authorization status with "logoutUser.fulfilled" action', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
    };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
    };

    const result = auth(initialState, logoutUser.fulfilled);

    expect(result).toEqual(expectedState);
  });
});
