import { State } from '../../types/state';

export const getUserInfo = (state: State) => state.user.userInfo;

export const getFavoritePlaces = (state: State) => state.user.favoritePlaces;
