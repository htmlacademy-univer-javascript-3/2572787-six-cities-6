import { State } from '../../types/state';

export const getPlaces = (state: State) => state.places.places;

export const getPlacesByCity = (city: string) => (state: State) =>
  state.places.places.filter((place) => place.city.name === city);
