import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import ApiRoute from '../const/api-route';
import PlaceType from '../types/place-type';
import PlaceDetailsType from '../types/place-details-type';
import AuthInfoType from '../types/auth-info-type';
import AuthorizationStatus from '../const/authorization-status';
import { saveToken } from '../services/token';
import ReviewType from '../types/review-type';
import { getSelectedPlace } from './selectors/selected-place-selectors';
import { updatePlaces } from './slices/places';
import { updateSelectedPlace } from './slices/selected-place';
import { updateAuthorizationStatus } from './slices/auth';
import { updateUserInfo } from './slices/user';

export const fetchPlacesAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchPlaces', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<PlaceType[]>(ApiRoute.Offers);
  dispatch(updatePlaces({ places: data }));
});

export const fetchPlaceAction = createAsyncThunk<
  void,
  { id: string },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchPlace', async ({ id }, { dispatch, extra: api }) => {
  try {
    const { data: detailedInfo } = await api.get<PlaceDetailsType>(
      `${ApiRoute.Offers}/${id}`,
    );
    const { data: nearPlaces } = await api.get<PlaceType[]>(
      `${ApiRoute.Offers}/${id}/nearby`,
    );
    const { data: reviews } = await api.get<ReviewType[]>(
      `${ApiRoute.Reviews}/${id}`,
    );
    dispatch(
      updateSelectedPlace({
        place: {
          detailedInfo,
          nearPlaces: nearPlaces.slice(0, 3),
          reviews,
        },
      }),
    );
  } catch {
    dispatch(updateSelectedPlace({ place: 'not-found' }));
  }
});

export const sendReview = createAsyncThunk<
  void,
  {
    comment: string;
    rating: number;
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/send-review', async (review, { getState, dispatch, extra: api }) => {
  const selectedPlace = getSelectedPlace(getState());

  if (selectedPlace === undefined || selectedPlace === 'not-found') {
    return;
  }

  const { data: newReview } = await api.post<ReviewType>(
    `${ApiRoute.Reviews}/${selectedPlace.detailedInfo.id}`,
    review,
  );
  dispatch(
    updateSelectedPlace({
      place: {
        ...selectedPlace,
        reviews: selectedPlace.reviews.concat(newReview),
      },
    }),
  );
});

export const checkUserToken = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('auth/login', async (_arg, { dispatch, extra: api }) => {
  try {
    const { data: authInfo } = await api.get<AuthInfoType>(ApiRoute.Login);
    dispatch(
      updateAuthorizationStatus({
        status: AuthorizationStatus.Auth,
      }),
    );
    dispatch(updateUserInfo({ info: authInfo }));
  } catch {
    dispatch(
      updateAuthorizationStatus({
        status: AuthorizationStatus.NoAuth,
      }),
    );
  }
});

export const loginUser = createAsyncThunk<
  void,
  {
    email: string;
    password: string;
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('auth/login', async (authData, { dispatch, extra: api }) => {
  try {
    const { data: authInfo } = await api.post<AuthInfoType>(
      ApiRoute.Login,
      authData,
    );
    saveToken(authInfo.token);
    dispatch(
      updateAuthorizationStatus({
        status: AuthorizationStatus.Auth,
      }),
    );
    dispatch(updateUserInfo({ info: authInfo }));
  } catch {
    dispatch(
      updateAuthorizationStatus({
        status: AuthorizationStatus.NoAuth,
      }),
    );
  }
});

export const logoutUser = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('auth/login', async (_arg, { dispatch, extra: api }) => {
  await api.delete(ApiRoute.Logout);
  dispatch(
    updateAuthorizationStatus({
      status: AuthorizationStatus.NoAuth,
    }),
  );
  dispatch(updateUserInfo({ info: undefined }));
});
