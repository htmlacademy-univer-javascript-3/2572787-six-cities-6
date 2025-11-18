import { createReducer } from '@reduxjs/toolkit';
import { changeCity, updatePlaces } from './action';
import places from '../mocks/places';
import cities from '../mocks/cities';

const initialState = {
  city: cities[0],
  places,
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
    .addCase(updatePlaces, (state) => {
      state.places = places;
    });
});

export { reducer };
