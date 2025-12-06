import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AuthorizationStatus from '../../const/authorization-status';

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
});

export const { updateAuthorizationStatus } = authSlice.actions;
export default authSlice.reducer;
