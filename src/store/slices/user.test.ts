import { toPlaceType } from '../../helpers/place-mapper';
import {
  mockPlace,
  mockPlaceDetails,
  mockUserCredentialsInfo,
  mockUserInfo,
} from '../../test-utils.ts/mocks';
import {
  addPlaceToFavorites,
  checkUserToken,
  fetchFavoritePlacesAction,
  loginUser,
  logoutUser,
  removePlaceFromFavorites,
} from '../api-actions';
import user, { updateUserInfo } from './user';

describe('User Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      userInfo: mockUserInfo(),
      favoritePlaces: [mockPlace()],
    };

    const result = user(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      userInfo: undefined,
      favoritePlaces: [],
    };

    const result = user(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should update user info with "updateUserInfo" action', () => {
    const initialState = {
      userInfo: undefined,
      favoritePlaces: [],
    };
    const mockUser = mockUserInfo();
    const expectedState = {
      userInfo: mockUser,
      favoritePlaces: [],
    };

    const result = user(initialState, updateUserInfo({ info: mockUser }));

    expect(result).toEqual(expectedState);
  });

  it('should update user with "checkUserToken.fulfilled" action', () => {
    const initialState = {
      userInfo: undefined,
      favoritePlaces: [],
    };
    const mockUser = mockUserInfo();
    const expectedState = {
      userInfo: mockUser,
      favoritePlaces: [],
    };

    const result = user(
      initialState,
      checkUserToken.fulfilled(mockUser, '', undefined),
    );

    expect(result).toEqual(expectedState);
  });

  it('should update user with "loginUser.fulfilled" action', () => {
    const initialState = {
      userInfo: undefined,
      favoritePlaces: [],
    };
    const mockUser = mockUserInfo();
    const mockCredentials = mockUserCredentialsInfo();
    const expectedState = {
      userInfo: mockUser,
      favoritePlaces: [],
    };

    const result = user(
      initialState,
      loginUser.fulfilled(mockUser, '', mockCredentials),
    );

    expect(result).toEqual(expectedState);
  });

  it('should reset user with "logoutUser.fulfilled" action', () => {
    const mockUser = mockUserInfo();
    const initialState = {
      userInfo: mockUser,
      favoritePlaces: [mockPlace()],
    };
    const expectedState = {
      userInfo: undefined,
      favoritePlaces: [],
    };

    const result = user(initialState, logoutUser.fulfilled);

    expect(result).toEqual(expectedState);
  });

  it('should update favorite places with "fetchFavoritePlacesAction.fulfilled" action', () => {
    const initialState = {
      userInfo: undefined,
      favoritePlaces: [],
    };
    const mockPlaces = [mockPlace()];
    const expectedState = {
      userInfo: undefined,
      favoritePlaces: mockPlaces,
    };

    const result = user(
      initialState,
      fetchFavoritePlacesAction.fulfilled(mockPlaces, '', undefined),
    );

    expect(result).toEqual(expectedState);
  });

  it('should add new favorite place with "addPlaceToFavorites.fulfilled" action', () => {
    const mockPlaces = [mockPlace()];
    const mockNewPlace = mockPlaceDetails();
    const initialState = {
      userInfo: undefined,
      favoritePlaces: mockPlaces,
    };
    const expectedState = {
      userInfo: undefined,
      favoritePlaces: mockPlaces.concat([toPlaceType(mockNewPlace)]),
    };

    const result = user(
      initialState,
      addPlaceToFavorites.fulfilled(mockNewPlace, '', { id: mockNewPlace.id }),
    );

    expect(result).toEqual(expectedState);
  });

  it('should remove favorite place with "removePlaceFromFavorites.fulfilled" action', () => {
    const mockDetails = mockPlaceDetails();
    const initialState = {
      userInfo: undefined,
      favoritePlaces: [toPlaceType(mockDetails)],
    };
    const expectedState = {
      userInfo: undefined,
      favoritePlaces: [],
    };

    const result = user(
      initialState,
      removePlaceFromFavorites.fulfilled(mockDetails, '', {
        id: mockDetails.id,
      }),
    );

    expect(result).toEqual(expectedState);
  });
});
