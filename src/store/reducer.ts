import { createReducer } from '@reduxjs/toolkit';
import { changeCity, updateSelectedPlace, updatePlaces } from './actions';
import cities from '../mocks/cities';
import CityType from '../types/city-type';
import PlaceType from '../types/place-type';
import PlaceDetailsType from '../types/place-details-type';

type InitialState = {
  city: CityType;
  places: PlaceType[];
  selectedPlace?: {
    detailedInfo: PlaceDetailsType;
    nearPlaces: PlaceType[];
  };
};

const initialState: InitialState = {
  city: cities[0],
  places: [],
  selectedPlace: undefined,
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
    });
});

export { reducer };
