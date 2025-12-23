import AuthorizationStatus from '../../const/authorization-status';
import { getAuthorizationStatus, getIsAuth } from './auth-selectors';

describe('Auth selectors', () => {
  describe('getAuthorizationStatus', () => {
    it('should return Unknown authorization status from state', () => {
      const state = {
        auth: { authorizationStatus: AuthorizationStatus.Unknown },
      };
      const status = state.auth.authorizationStatus;

      const result = getAuthorizationStatus(state);

      expect(result).toEqual(status);
    });

    it('should return Auth authorization status from state', () => {
      const state = {
        auth: { authorizationStatus: AuthorizationStatus.Auth },
      };
      const status = state.auth.authorizationStatus;

      const result = getAuthorizationStatus(state);

      expect(result).toEqual(status);
    });

    it('should return NoAuth authorization status from state', () => {
      const state = {
        auth: { authorizationStatus: AuthorizationStatus.NoAuth },
      };
      const status = state.auth.authorizationStatus;

      const result = getAuthorizationStatus(state);

      expect(result).toEqual(status);
    });
  });

  describe('getIsAuth', () => {
    it('should return false with Unknown from state', () => {
      const state = {
        auth: { authorizationStatus: AuthorizationStatus.Unknown },
      };

      const result = getIsAuth(state);

      expect(result).toEqual(false);
    });

    it('should return true with Auth from state', () => {
      const state = {
        auth: { authorizationStatus: AuthorizationStatus.Auth },
      };

      const result = getIsAuth(state);

      expect(result).toEqual(true);
    });

    it('should return false with NoAuth from state', () => {
      const state = {
        auth: { authorizationStatus: AuthorizationStatus.NoAuth },
      };

      const result = getIsAuth(state);

      expect(result).toEqual(false);
    });
  });
});
