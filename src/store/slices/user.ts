import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import UserInfoType from '../../types/user-info-type';
import { checkUserToken, loginUser, logoutUser } from '../api-actions';

interface UserState {
  userInfo?: UserInfoType;
}

const initialState: UserState = {
  userInfo: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<{ info?: UserInfoType }>) => {
      state.userInfo = action.payload.info;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(checkUserToken.fulfilled, (state, action) => {
        state.userInfo = action.payload || undefined;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userInfo = action.payload || undefined;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.userInfo = undefined;
      });
  },
});

export const { updateUserInfo } = userSlice.actions;
export default userSlice.reducer;
