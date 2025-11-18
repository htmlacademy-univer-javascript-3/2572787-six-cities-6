import { createAction } from '@reduxjs/toolkit';

export const changeCity = createAction<{ city: string }>('city/change');

export const updatePlaces = createAction('city/updatePlaces');
