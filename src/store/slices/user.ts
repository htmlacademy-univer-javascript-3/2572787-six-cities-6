import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import UserInfoType from '../../types/user-info-type';
import {
  addPlaceToFavorites,
  checkUserToken,
  fetchFavoritePlacesAction,
  loginUser,
  logoutUser,
  removePlaceFromFavorites,
} from '../api-actions';
import PlaceType from '../../types/place-type';
import { toPlaceType } from '../../helpers/place-mapper';

interface UserState {
  userInfo?: UserInfoType;
  favoritePlaces: PlaceType[];
}

const initialState: UserState = {
  userInfo: undefined,
  favoritePlaces: [],
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
        state.favoritePlaces = [];
      })
      .addCase(fetchFavoritePlacesAction.fulfilled, (state, action) => {
        state.favoritePlaces = action.payload || [];
      })
      .addCase(addPlaceToFavorites.fulfilled, (state, action) => {
        if (action.payload) {
          state.favoritePlaces.push(toPlaceType(action.payload));
        }
      })
      .addCase(removePlaceFromFavorites.fulfilled, (state, action) => {
        if (action.payload) {
          state.favoritePlaces = state.favoritePlaces.filter(
            (place) => place.id !== action.payload?.id,
          );
        }
      });
  },
});

export const { updateUserInfo } = userSlice.actions;
export default userSlice.reducer;
