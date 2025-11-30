import { createAction } from '@reduxjs/toolkit';
import PlaceDetailsType from '../types/place-details-type';
import PlaceType from '../types/place-type';
import AuthorizationStatus from '../const/authorization-status';
import UserInfoType from '../types/user-info-type';
import ReviewType from '../types/review-type';

export const changeCity = createAction<{ city: string }>('city/change');

export const updatePlaces = createAction<{ places: PlaceType[] }>(
  'city/updatePlaces',
);

export const updateSelectedPlace = createAction<{
  place?:
    | {
        detailedInfo: PlaceDetailsType;
        nearPlaces: PlaceType[];
        reviews: ReviewType[];
      }
    | 'not-found';
}>('city/updatePlace');

export const updateAuthorizationStatus = createAction<{
  status: AuthorizationStatus;
}>('city/updateAuthorizationStatus');

export const updateUserInfo = createAction<{
  info?: UserInfoType;
}>('city/updateUserInfo');
