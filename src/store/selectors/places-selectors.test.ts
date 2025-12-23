import { mockPlace } from '../../test-utils/mocks';
import { getPlaces } from './places-selectors';

describe('Places selectors', () => {
  it('should return places from state', () => {
    const mockPlaces = [mockPlace(), mockPlace(), mockPlace()];
    const state = {
      places: {
        places: mockPlaces,
      },
    };

    const result = getPlaces(state);

    expect(result).toEqual(mockPlaces);
  });
});
