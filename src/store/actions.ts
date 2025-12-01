import { createAction } from '@reduxjs/toolkit';
import PlaceDetailsType from '../types/place-details-type';
import PlaceType from '../types/place-type';

export const changeCity = createAction<{ city: string }>('city/change');

export const updatePlaces = createAction<{ places: PlaceType[] }>(
  'city/updatePlaces',
);

export const updateSelectedPlace = createAction<{
  place?: {
    detailedInfo: PlaceDetailsType;
    nearPlaces: PlaceType[];
  };
}>('city/updatePlace');
