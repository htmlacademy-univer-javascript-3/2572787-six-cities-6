import {
  name,
  internet,
  image,
  datatype,
  commerce,
  address,
  lorem,
} from 'faker';
import UserInfoType from '../types/user-info-type';
import PlaceType from '../types/place-type';
import PlaceDetailsType from '../types/place-details-type';
import ReviewType from '../types/review-type';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { State } from '../types/state';
import { createAPI } from '../services/api';
import AuthInfoType from '../types/auth-info-type';

export type AppThunkDispatch = ThunkDispatch<
  State,
  ReturnType<typeof createAPI>,
  Action
>;

export function mockUserCredentialsInfo(): { email: string; password: string } {
  return {
    email: internet.email(),
    password: internet.password(),
  };
}

export function mockAuthInfo(): AuthInfoType {
  return {
    avatarUrl: internet.avatar(),
    email: internet.email(),
    isPro: datatype.boolean(),
    name: name.findName(),
    token: datatype.uuid(),
  };
}

export function mockUserInfo(): UserInfoType {
  return {
    email: internet.email(),
    avatarUrl: internet.avatar(),
  };
}

export function mockPlace(): PlaceType {
  return {
    id: datatype.uuid(),
    title: name.title(),
    type: commerce.productName(),
    price: datatype.number({ min: 50, max: 1000 }),
    city: {
      name: address.cityName(),
      location: {
        latitude: parseFloat(address.latitude()),
        longitude: parseFloat(address.longitude()),
        zoom: datatype.number({ min: 10, max: 16 }),
      },
    },
    location: {
      latitude: parseFloat(address.latitude()),
      longitude: parseFloat(address.longitude()),
      zoom: datatype.number({ min: 10, max: 16 }),
    },
    isFavorite: datatype.boolean(),
    isPremium: datatype.boolean(),
    rating: datatype.number({ min: 1, max: 5, precision: 0.1 }),
    previewImage: image.imageUrl(640, 480, 'city', true),
  };
}

export function mockPlaceDetails(): PlaceDetailsType {
  const basePlace = mockPlace();

  const goodsCategories = [
    'Wi-Fi',
    'Heating',
    'Kitchen',
    'Washer',
    'Dryer',
    'Air conditioning',
    'Parking',
    'Elevator',
    'Pool',
    'Gym',
    'TV',
    'Breakfast',
    'Pets allowed',
  ];

  const goodsCount = datatype.number({ min: 3, max: 8 });
  const goods = Array.from(
    { length: goodsCount },
    () =>
      goodsCategories[
        datatype.number({ min: 0, max: goodsCategories.length - 1 })
      ],
  );

  const imagesCount = datatype.number({ min: 6, max: 10 });
  const images = Array.from({ length: imagesCount }, () =>
    image.imageUrl(800, 600, 'city,house,apartment', true),
  );

  return {
    ...basePlace,
    description: lorem.paragraphs(datatype.number({ min: 2, max: 4 })),
    bedrooms: datatype.number({ min: 1, max: 5 }),
    maxAdults: datatype.number({ min: 1, max: 8 }),
    goods: Array.from(new Set(goods)),
    host: {
      name: name.findName(),
      avatarUrl: internet.avatar(),
      isPro: datatype.boolean(),
    },
    images,
  };
}

export function mockReview(): ReviewType {
  return {
    id: datatype.uuid(),
    date: datatype.datetime().toDateString(),
    user: {
      name: name.findName(),
      avatarUrl: internet.avatar(),
      isPro: datatype.boolean(),
    },
    comment: lorem.paragraph(),
    rating: datatype.number({ min: 1, max: 5 }),
  };
}

export const extractActionsTypes = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);
