import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import ApiRoute from '../const/api-route';
import PlaceType from '../types/place-type';
import PlaceDetailsType from '../types/place-details-type';
import AuthInfoType from '../types/auth-info-type';
import { saveToken } from '../services/token';
import ReviewType from '../types/review-type';
import { getSelectedPlace } from './selectors/selected-place-selectors';
import UserInfoType from '../types/user-info-type';

export const fetchPlacesAction = createAsyncThunk<
  PlaceType[] | null,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchPlaces', async (_arg, { extra: api }) => {
  try {
    const { data } = await api.get<PlaceType[]>(ApiRoute.Offers);
    return data;
  } catch {
    return null;
  }
});

export const fetchPlaceAction = createAsyncThunk<
  {
    detailedInfo: PlaceDetailsType;
    nearPlaces: PlaceType[];
    reviews: ReviewType[];
  } | null,
  { id: string },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchPlace', async ({ id }, { extra: api }) => {
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
    return {
      detailedInfo,
      nearPlaces: nearPlaces.slice(0, 3),
      reviews,
    };
  } catch {
    return null;
  }
});

export const sendReview = createAsyncThunk<
  ReviewType | null,
  {
    comment: string;
    rating: number;
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/send-review', async (review, { getState, extra: api }) => {
  const selectedPlace = getSelectedPlace(getState());

  if (!selectedPlace) {
    return null;
  }

  const { data: newReview } = await api.post<ReviewType>(
    `${ApiRoute.Reviews}/${selectedPlace.detailedInfo.id}`,
    review,
  );
  return newReview;
});

export const fetchFavoritePlacesAction = createAsyncThunk<
  PlaceType[] | null,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetch-favorite-places', async (_arg, { extra: api }) => {
  try {
    const { data: favoritePlaces } = await api.get<PlaceType[]>(
      ApiRoute.Favorite,
    );
    return favoritePlaces;
  } catch {
    return null;
  }
});

export const removePlaceFromFavorites = createAsyncThunk<
  PlaceDetailsType | null,
  { id: string },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/remove-from-favorites', async ({ id }, { extra: api }) => {
  try {
    const { data: detailedInfo } = await api.post<PlaceDetailsType>(
      `${ApiRoute.Favorite}/${id}/0`,
    );
    return detailedInfo;
  } catch {
    return null;
  }
});

export const addPlaceToFavorites = createAsyncThunk<
  PlaceDetailsType | null,
  { id: string },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/add-to-favorites', async ({ id }, { extra: api }) => {
  try {
    const { data: detailedInfo } = await api.post<PlaceDetailsType>(
      `${ApiRoute.Favorite}/${id}/1`,
    );
    return detailedInfo;
  } catch {
    return null;
  }
});

export const checkUserToken = createAsyncThunk<
  UserInfoType | null,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('auth/check-token', async (_arg, { extra: api }) => {
  try {
    const { data: authInfo } = await api.get<AuthInfoType>(ApiRoute.Login);
    return authInfo;
  } catch {
    return null;
  }
});

export const loginUser = createAsyncThunk<
  UserInfoType | null,
  {
    email: string;
    password: string;
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('auth/login', async (authData, { extra: api }) => {
  try {
    const { data: authInfo } = await api.post<AuthInfoType>(
      ApiRoute.Login,
      authData,
    );
    saveToken(authInfo.token);
    return authInfo;
  } catch {
    return null;
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
>('auth/logout', async (_arg, { extra: api }) => {
  await api.delete(ApiRoute.Logout);
});
