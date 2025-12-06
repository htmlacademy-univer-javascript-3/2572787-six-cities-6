import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import PlaceType from '../../types/place-type';

interface PlacesState {
  places: PlaceType[];
}

const initialState: PlacesState = {
  places: [],
};

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    updatePlaces: (state, action: PayloadAction<{ places: PlaceType[] }>) => {
      state.places = action.payload.places;
    },
  },
});

export const { updatePlaces } = placesSlice.actions;
export default placesSlice.reducer;
