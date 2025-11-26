import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { updatePlaces, updateSelectedPlace } from './actions';
import ApiRoute from '../const/api-route';
import PlaceType from '../types/place-type';
import PlaceDetailsType from '../types/place-details-type';

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
  const { data: detailedInfo } = await api.get<PlaceDetailsType>(
    `${ApiRoute.Offers}/${id}`,
  );
  const { data: nearPlaces } = await api.get<PlaceType[]>(
    `${ApiRoute.Offers}/${id}/nearby`,
  );
  dispatch(
    updateSelectedPlace({
      place: { detailedInfo, nearPlaces: nearPlaces.slice(0, 3) },
    }),
  );
});
