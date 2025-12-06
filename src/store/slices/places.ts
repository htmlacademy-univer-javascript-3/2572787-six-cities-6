import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import PlaceType from '../../types/place-type';
import { fetchPlacesAction } from '../api-actions';

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
  extraReducers(builder) {
    builder.addCase(fetchPlacesAction.fulfilled, (state, action) => {
      state.places = action.payload || [];
    });
  },
});

export const { updatePlaces } = placesSlice.actions;
export default placesSlice.reducer;
