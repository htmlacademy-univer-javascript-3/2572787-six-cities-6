import { createReducer } from '@reduxjs/toolkit';
import {
  changeCity,
  updateSelectedPlace,
  updatePlaces,
  updateAuthorizationStatus,
  updateUserInfo,
} from './actions';
import cities from '../mocks/cities';
import CityType from '../types/city-type';
import PlaceType from '../types/place-type';
import PlaceDetailsType from '../types/place-details-type';
import AuthorizationStatus from '../const/authorization-status';
import UserInfoType from '../types/user-info-type';

type InitialState = {
  city: CityType;
  places: PlaceType[];
  selectedPlace?: {
    detailedInfo: PlaceDetailsType;
    nearPlaces: PlaceType[];
  };
  authorizationStatus: AuthorizationStatus;
  userInfo?: UserInfoType;
};

const initialState: InitialState = {
  city: cities[0],
  places: [],
  selectedPlace: undefined,
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: undefined,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      const { city: cityName } = action.payload;
      const foundCity = cities.find((city) => city.name === cityName);
      if (!foundCity) {
        return;
      }
      state.city = foundCity;
    })
    .addCase(updatePlaces, (state, action) => {
      state.places = action.payload.places;
    })
    .addCase(updateSelectedPlace, (state, action) => {
      state.selectedPlace = action.payload.place;
    })
    .addCase(updateAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload.status;
    })
    .addCase(updateUserInfo, (state, action) => {
      state.userInfo = action.payload.info;
    });
});

export { reducer };
