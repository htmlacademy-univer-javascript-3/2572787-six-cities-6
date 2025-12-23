import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { State } from '../types/state';
import {
  addPlaceToFavorites,
  checkUserToken,
  fetchFavoritePlacesAction,
  fetchPlaceAction,
  fetchPlacesAction,
  loginUser,
  logoutUser,
  removePlaceFromFavorites,
  sendReview,
} from './api-actions';
import ApiRoute from '../const/api-route';
import {
  AppThunkDispatch,
  extractActionsTypes,
  mockAuthInfo,
  mockPlace,
  mockPlaceDetails,
  mockReview,
  mockUserCredentialsInfo,
} from '../test-utils.ts/mocks';
import * as tokenStorage from '../services/token';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({});
  });

  describe('fetchPlacesAction', () => {
    it('should dispatch "fetchPlacesAction.pending", "fetchPlacesAction.fulfilled" with thunk "fetchPlacesAction', async () => {
      const places = [mockPlace(), mockPlace(), mockPlace()];
      mockAxiosAdapter.onGet(ApiRoute.Offers).reply(200, places);

      await store.dispatch(fetchPlacesAction());
      const actions = extractActionsTypes(store.getActions());
      const fetchPlacesActionFulfilled = store.getActions().at(1) as ReturnType<
        typeof fetchPlacesAction.fulfilled
      >;

      expect(actions).toEqual([
        fetchPlacesAction.pending.type,
        fetchPlacesAction.fulfilled.type,
      ]);

      expect(fetchPlacesActionFulfilled.payload).toEqual(places);
    });

    it('should dispatch "fetchPlacesAction.pending", "fetchPlacesAction.fulfilled" with null payload when server response 400', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Offers).reply(400);

      await store.dispatch(fetchPlacesAction());
      const actions = extractActionsTypes(store.getActions());
      const fetchPlacesActionFulfilled = store.getActions().at(1) as ReturnType<
        typeof fetchPlacesAction.fulfilled
      >;

      expect(actions).toEqual([
        fetchPlacesAction.pending.type,
        fetchPlacesAction.fulfilled.type,
      ]);

      expect(fetchPlacesActionFulfilled.payload).toBe(null);
    });
  });

  describe('fetchPlaceAction', () => {
    it('should dispatch "fetchPlaceAction.pending", "fetchPlaceAction.fulfilled" with thunk "fetchPlaceAction', async () => {
      const placeDetails = mockPlaceDetails();
      const nearbyPlaces = [mockPlace(), mockPlace(), mockPlace()];
      const reviews = [mockReview(), mockReview(), mockReview()];
      const selectedPlace = {
        detailedInfo: placeDetails,
        nearPlaces: nearbyPlaces,
        reviews,
      };
      mockAxiosAdapter
        .onGet(`${ApiRoute.Offers}/${placeDetails.id}`)
        .reply(200, placeDetails);
      mockAxiosAdapter
        .onGet(`${ApiRoute.Offers}/${placeDetails.id}/nearby`)
        .reply(200, nearbyPlaces);
      mockAxiosAdapter
        .onGet(`${ApiRoute.Reviews}/${placeDetails.id}`)
        .reply(200, reviews);

      await store.dispatch(fetchPlaceAction({ id: placeDetails.id }));
      const actions = extractActionsTypes(store.getActions());
      const fetchPlaceActionFulfilled = store.getActions().at(1) as ReturnType<
        typeof fetchPlaceAction.fulfilled
      >;

      expect(actions).toEqual([
        fetchPlaceAction.pending.type,
        fetchPlaceAction.fulfilled.type,
      ]);

      expect(fetchPlaceActionFulfilled.payload).toEqual(selectedPlace);
    });
  });

  describe('sendReview', () => {
    it('should dispatch "sendReview.pending", "sendReview.fulfilled" with thunk "sendReview', async () => {
      const placeDetails = mockPlaceDetails();
      const nearbyPlaces = [mockPlace(), mockPlace(), mockPlace()];
      const reviews = [mockReview(), mockReview(), mockReview()];
      const selectedPlace = {
        detailedInfo: placeDetails,
        nearPlaces: nearbyPlaces,
        reviews,
      };
      store = mockStoreCreator({
        selectedPlace: { selectedPlace },
      });
      const newReview = mockReview();
      mockAxiosAdapter
        .onPost(`${ApiRoute.Reviews}/${selectedPlace.detailedInfo.id}`)
        .reply(200, newReview);

      await store.dispatch(sendReview(newReview));
      const actions = extractActionsTypes(store.getActions());
      const sendReviewFulfilled = store.getActions().at(1) as ReturnType<
        typeof sendReview.fulfilled
      >;

      expect(actions).toEqual([
        sendReview.pending.type,
        sendReview.fulfilled.type,
      ]);

      expect(sendReviewFulfilled.payload).toEqual(newReview);
    });
  });

  describe('fetchFavoritePlacesAction', () => {
    it('should dispatch "fetchFavoritePlacesAction.pending", "fetchFavoritePlacesAction.fulfilled" with thunk "fetchFavoritePlacesAction', async () => {
      const places = [mockPlace(), mockPlace(), mockPlace()];
      mockAxiosAdapter.onGet(ApiRoute.Favorite).reply(200, places);

      await store.dispatch(fetchFavoritePlacesAction());
      const actions = extractActionsTypes(store.getActions());
      const fetchFavoritePlacesActionFulfilled = store
        .getActions()
        .at(1) as ReturnType<typeof fetchFavoritePlacesAction.fulfilled>;

      expect(actions).toEqual([
        fetchFavoritePlacesAction.pending.type,
        fetchFavoritePlacesAction.fulfilled.type,
      ]);

      expect(fetchFavoritePlacesActionFulfilled.payload).toEqual(places);
    });

    it('should dispatch "fetchFavoritePlacesAction.pending", "fetchFavoritePlacesAction.fulfilled" with null payload when server response 400', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Favorite).reply(400);

      await store.dispatch(fetchFavoritePlacesAction());
      const actions = extractActionsTypes(store.getActions());
      const fetchFavoritePlacesActionFulfilled = store
        .getActions()
        .at(1) as ReturnType<typeof fetchFavoritePlacesAction.fulfilled>;

      expect(actions).toEqual([
        fetchFavoritePlacesAction.pending.type,
        fetchFavoritePlacesAction.fulfilled.type,
      ]);

      expect(fetchFavoritePlacesActionFulfilled.payload).toBe(null);
    });
  });

  describe('removePlaceFromFavorites', () => {
    it('should dispatch "removePlaceFromFavorites.pending", "removePlaceFromFavorites.fulfilled" with thunk "removePlaceFromFavorites', async () => {
      const placeDetails = mockPlaceDetails();
      mockAxiosAdapter
        .onPost(`${ApiRoute.Favorite}/${placeDetails.id}/0`)
        .reply(200, placeDetails);

      await store.dispatch(removePlaceFromFavorites({ id: placeDetails.id }));
      const actions = extractActionsTypes(store.getActions());
      const removePlaceFromFavoritesFulfilled = store
        .getActions()
        .at(1) as ReturnType<typeof removePlaceFromFavorites.fulfilled>;

      expect(actions).toEqual([
        removePlaceFromFavorites.pending.type,
        removePlaceFromFavorites.fulfilled.type,
      ]);

      expect(removePlaceFromFavoritesFulfilled.payload).toEqual(placeDetails);
    });

    it('should dispatch "removePlaceFromFavorites.pending", "removePlaceFromFavorites.fulfilled" with null payload when server response 400', async () => {
      const placeDetails = mockPlaceDetails();
      mockAxiosAdapter
        .onPost(`${ApiRoute.Favorite}/${placeDetails.id}/0`)
        .reply(400);

      await store.dispatch(removePlaceFromFavorites({ id: placeDetails.id }));
      const actions = extractActionsTypes(store.getActions());
      const removePlaceFromFavoritesFulfilled = store
        .getActions()
        .at(1) as ReturnType<typeof removePlaceFromFavorites.fulfilled>;

      expect(actions).toEqual([
        removePlaceFromFavorites.pending.type,
        removePlaceFromFavorites.fulfilled.type,
      ]);

      expect(removePlaceFromFavoritesFulfilled.payload).toBe(null);
    });
  });

  describe('addPlaceToFavorites', () => {
    it('should dispatch "addPlaceToFavorites.pending", "addPlaceToFavorites.fulfilled" with thunk "addPlaceToFavorites', async () => {
      const placeDetails = mockPlaceDetails();
      mockAxiosAdapter
        .onPost(`${ApiRoute.Favorite}/${placeDetails.id}/1`)
        .reply(200, placeDetails);

      await store.dispatch(addPlaceToFavorites({ id: placeDetails.id }));
      const actions = extractActionsTypes(store.getActions());
      const addPlaceToFavoritesFulfilled = store
        .getActions()
        .at(1) as ReturnType<typeof addPlaceToFavorites.fulfilled>;

      expect(actions).toEqual([
        addPlaceToFavorites.pending.type,
        addPlaceToFavorites.fulfilled.type,
      ]);

      expect(addPlaceToFavoritesFulfilled.payload).toEqual(placeDetails);
    });

    it('should dispatch "addPlaceToFavorites.pending", "addPlaceToFavorites.fulfilled" with null payload when server response 400', async () => {
      const placeDetails = mockPlaceDetails();
      mockAxiosAdapter
        .onPost(`${ApiRoute.Favorite}/${placeDetails.id}/1`)
        .reply(400);

      await store.dispatch(addPlaceToFavorites({ id: placeDetails.id }));
      const actions = extractActionsTypes(store.getActions());
      const addPlaceToFavoritesFulfilled = store
        .getActions()
        .at(1) as ReturnType<typeof addPlaceToFavorites.fulfilled>;

      expect(actions).toEqual([
        addPlaceToFavorites.pending.type,
        addPlaceToFavorites.fulfilled.type,
      ]);

      expect(addPlaceToFavoritesFulfilled.payload).toBe(null);
    });
  });

  describe('checkUserToken', () => {
    it('should dispatch "checkUserToken.pending", "checkUserToken.fulfilled" with thunk "checkUserToken', async () => {
      const authInfo = mockAuthInfo();
      mockAxiosAdapter.onGet(ApiRoute.Login).reply(200, authInfo);

      await store.dispatch(checkUserToken());
      const actions = extractActionsTypes(store.getActions());
      const checkUserTokenFulfilled = store.getActions().at(1) as ReturnType<
        typeof checkUserToken.fulfilled
      >;

      expect(actions).toEqual([
        checkUserToken.pending.type,
        checkUserToken.fulfilled.type,
      ]);

      expect(checkUserTokenFulfilled.payload).toEqual(authInfo);
    });

    it('should dispatch "checkUserToken.pending", "checkUserToken.fulfilled" with null payload when server response 400', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Login).reply(400);

      await store.dispatch(checkUserToken());
      const actions = extractActionsTypes(store.getActions());
      const checkUserTokenFulfilled = store.getActions().at(1) as ReturnType<
        typeof checkUserToken.fulfilled
      >;

      expect(actions).toEqual([
        checkUserToken.pending.type,
        checkUserToken.fulfilled.type,
      ]);

      expect(checkUserTokenFulfilled.payload).toBe(null);
    });
  });

  describe('loginUser', () => {
    it('should dispatch "loginUser.pending", "loginUser.fulfilled" with thunk "loginUser', async () => {
      const authInfo = mockAuthInfo();
      const credentials = mockUserCredentialsInfo();
      mockAxiosAdapter.onPost(ApiRoute.Login).reply(200, authInfo);

      await store.dispatch(loginUser(credentials));
      const actions = extractActionsTypes(store.getActions());
      const loginUserFulfilled = store.getActions().at(1) as ReturnType<
        typeof loginUser.fulfilled
      >;

      expect(actions).toEqual([
        loginUser.pending.type,
        loginUser.fulfilled.type,
      ]);

      expect(loginUserFulfilled.payload).toEqual(authInfo);
    });

    it('should save token with thunk "loginUser', async () => {
      const authInfo = mockAuthInfo();
      const credentials = mockUserCredentialsInfo();
      mockAxiosAdapter.onPost(ApiRoute.Login).reply(200, authInfo);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginUser(credentials));

      expect(mockSaveToken).toHaveBeenCalledTimes(1);
      expect(mockSaveToken).toHaveBeenCalledWith(authInfo.token);
    });

    it('should dispatch "loginUser.pending", "loginUser.fulfilled" with null payload when server response 400', async () => {
      const credentials = mockUserCredentialsInfo();
      mockAxiosAdapter.onPost(ApiRoute.Login).reply(400);

      await store.dispatch(loginUser(credentials));
      const actions = extractActionsTypes(store.getActions());
      const loginUserFulfilled = store.getActions().at(1) as ReturnType<
        typeof loginUser.fulfilled
      >;

      expect(actions).toEqual([
        loginUser.pending.type,
        loginUser.fulfilled.type,
      ]);

      expect(loginUserFulfilled.payload).toBe(null);
    });
  });

  describe('logoutUser', () => {
    it('should dispatch "logoutUser.pending", "logoutUser.fulfilled" with thunk "logoutUser', async () => {
      mockAxiosAdapter.onDelete(ApiRoute.Logout).reply(200);

      await store.dispatch(logoutUser());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutUser.pending.type,
        logoutUser.fulfilled.type,
      ]);
    });

    it('should drop token with thunk "logoutUser', async () => {
      mockAxiosAdapter.onDelete(ApiRoute.Logout).reply(200);
      const mockSaveToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutUser());

      expect(mockSaveToken).toHaveBeenCalledTimes(1);
    });
  });
});
