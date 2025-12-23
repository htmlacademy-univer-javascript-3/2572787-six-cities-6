import { State } from '../../types/state';

export const getCity = (state: Pick<State, 'city'>) => state.city.city;
