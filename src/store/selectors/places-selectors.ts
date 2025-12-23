import { State } from '../../types/state';

export const getPlaces = (state: Pick<State, 'places'>) => state.places.places;
