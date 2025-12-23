import { mockPlace } from '../../test-utils/mocks';
import { fetchPlacesAction } from '../api-actions';
import places, { updatePlaces } from './places';

describe('Places Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      places: [mockPlace()],
    };

    const result = places(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      places: [],
    };

    const result = places(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should update places with "updatePlaces" action', () => {
    const initialState = {
      places: [],
    };
    const placesList = [mockPlace()];
    const expectedState = {
      places: placesList,
    };

    const result = places(initialState, updatePlaces({ places: placesList }));

    expect(result).toEqual(expectedState);
  });

  it('should update places with "fetchPlacesAction.fulfilled" action', () => {
    const initialState = {
      places: [],
    };
    const placesList = [mockPlace()];
    const expectedState = {
      places: placesList,
    };

    const result = places(
      initialState,
      fetchPlacesAction.fulfilled(placesList, '', undefined),
    );

    expect(result).toEqual(expectedState);
  });
});
