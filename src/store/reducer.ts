import { combineReducers } from '@reduxjs/toolkit';
import cityReducer from './slices/city';
import placesReducer from './slices/places';
import selectedPlaceReducer from './slices/selected-place';
import authReducer from './slices/auth';
import userReducer from './slices/user';

export const rootReducer = combineReducers({
  city: cityReducer,
  places: placesReducer,
  selectedPlace: selectedPlaceReducer,
  auth: authReducer,
  user: userReducer,
});
