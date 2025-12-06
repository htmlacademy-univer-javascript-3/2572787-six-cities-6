import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import PlaceDetailsType from '../../types/place-details-type';
import PlaceType from '../../types/place-type';
import ReviewType from '../../types/review-type';

type SelectedPlaceState = {
  selectedPlace?:
    | {
        detailedInfo: PlaceDetailsType;
        nearPlaces: PlaceType[];
        reviews: ReviewType[];
      }
    | 'not-found';
};

const initialState: SelectedPlaceState = {
  selectedPlace: undefined,
};

const selectedPlaceSlice = createSlice({
  name: 'selectedPlace',
  initialState,
  reducers: {
    updateSelectedPlace: (
      state,
      action: PayloadAction<{
        place?:
          | {
              detailedInfo: PlaceDetailsType;
              nearPlaces: PlaceType[];
              reviews: ReviewType[];
            }
          | 'not-found';
      }>,
    ) => {
      state.selectedPlace = action.payload.place;
    },
  },
});

export const { updateSelectedPlace } = selectedPlaceSlice.actions;
export default selectedPlaceSlice.reducer;
