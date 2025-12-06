import { State } from '../../types/state';
import PlaceType from '../../types/place-type';

export const getPlaces = (state: State) => state.places.places;

export const getPlacesByCity = (city: string) => (state: State) =>
  state.places.places.filter((place) => place.city.name === city);

export const getFavoritePlaces = (state: State): PlaceType[] =>
  state.places.places.filter((place) => place.isFavorite);
