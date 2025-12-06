import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AuthorizationStatus from '../../const/authorization-status';
import { checkUserToken, loginUser, logoutUser } from '../api-actions';

interface AuthState {
  authorizationStatus: AuthorizationStatus;
}

const initialState: AuthState = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAuthorizationStatus: (
      state,
      action: PayloadAction<{ status: AuthorizationStatus }>,
    ) => {
      state.authorizationStatus = action.payload.status;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(checkUserToken.fulfilled, (state, action) => {
        state.authorizationStatus =
          action.payload === null
            ? AuthorizationStatus.NoAuth
            : AuthorizationStatus.Auth;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.authorizationStatus =
          action.payload === null
            ? AuthorizationStatus.NoAuth
            : AuthorizationStatus.Auth;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  },
});

export const { updateAuthorizationStatus } = authSlice.actions;
export default authSlice.reducer;
