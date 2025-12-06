import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CityType from '../../types/city-type';
import cities from '../../mocks/cities';

interface CityState {
  city: CityType;
}

const initialState: CityState = {
  city: cities[0],
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<{ city: string }>) => {
      const { city: cityName } = action.payload;
      const foundCity = cities.find((city) => city.name === cityName);
      if (foundCity) {
        state.city = foundCity;
      }
    },
  },
});

export const { changeCity } = citySlice.actions;
export default citySlice.reducer;
