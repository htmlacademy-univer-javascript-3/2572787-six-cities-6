import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import PlaceDetailsType from '../../types/place-details-type';
import PlaceType from '../../types/place-type';
import ReviewType from '../../types/review-type';
import { fetchPlaceAction, sendReview } from '../api-actions';

type SelectedPlaceData = {
  detailedInfo: PlaceDetailsType;
  nearPlaces: PlaceType[];
  reviews: ReviewType[];
};

type SelectedPlaceState = {
  selectedPlace?: SelectedPlaceData;
  isLoading: boolean;
  isNotFound: boolean;
};

const initialState: SelectedPlaceState = {
  selectedPlace: undefined,
  isLoading: false,
  isNotFound: false,
};

const selectedPlaceSlice = createSlice({
  name: 'selectedPlace',
  initialState,
  reducers: {
    updateSelectedPlace: (
      state,
      action: PayloadAction<{
        place?: SelectedPlaceData;
      }>,
    ) => {
      state.selectedPlace = action.payload.place;
      state.isNotFound = !action.payload.place;
    },
    clearSelectedPlace: (state) => {
      state.selectedPlace = undefined;
      state.isNotFound = false;
    },
    markAsNotFound: (state) => {
      state.selectedPlace = undefined;
      state.isNotFound = true;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPlaceAction.pending, (state) => {
        state.selectedPlace = undefined;
        state.isLoading = true;
        state.isNotFound = false;
      })
      .addCase(fetchPlaceAction.fulfilled, (state, action) => {
        state.selectedPlace = action.payload || undefined;
        state.isLoading = false;
        state.isNotFound = !action.payload;
      })
      .addCase(fetchPlaceAction.rejected, (state) => {
        state.selectedPlace = undefined;
        state.isLoading = false;
        state.isNotFound = true;
      })
      .addCase(sendReview.fulfilled, (state, action) => {
        if (state.selectedPlace && action.payload) {
          state.selectedPlace.reviews.push(action.payload);
        }
      });
  },
});

export const { updateSelectedPlace, clearSelectedPlace, markAsNotFound } =
  selectedPlaceSlice.actions;
export default selectedPlaceSlice.reducer;
