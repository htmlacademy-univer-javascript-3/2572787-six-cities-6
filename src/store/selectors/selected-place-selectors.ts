import { State } from '../../types/state';

export const getSelectedPlace = (state: Pick<State, 'selectedPlace'>) =>
  state.selectedPlace.selectedPlace;

export const isPlaceNotFound = (state: Pick<State, 'selectedPlace'>) =>
  state.selectedPlace.isNotFound;

export const isPlaceLoading = (state: Pick<State, 'selectedPlace'>) =>
  state.selectedPlace.isLoading;
