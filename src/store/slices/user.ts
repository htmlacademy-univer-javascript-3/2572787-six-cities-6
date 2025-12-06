import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import UserInfoType from '../../types/user-info-type';

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
});

export const { updateUserInfo } = userSlice.actions;
export default userSlice.reducer;
