import { State } from '../../types/state';

export const getSelectedPlace = (state: State) =>
  state.selectedPlace.selectedPlace;

export const getPlaceDetails = (state: State) => {
  const selectedPlace = state.selectedPlace.selectedPlace;
  return selectedPlace ? selectedPlace.detailedInfo : undefined;
};

export const getNearPlaces = (state: State) => {
  const selectedPlace = state.selectedPlace.selectedPlace;
  return selectedPlace ? selectedPlace.nearPlaces : [];
};

export const getReviews = (state: State) => {
  const selectedPlace = state.selectedPlace.selectedPlace;
  return selectedPlace ? selectedPlace.reviews : [];
};

export const isPlaceNotFound = (state: State) => state.selectedPlace.isNotFound;

export const isPlaceLoading = (state: State) => state.selectedPlace.isLoading;
