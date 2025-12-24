import {
  mockPlace,
  mockPlaceDetails,
  mockReview,
} from '../../test-utils/mocks';
import {
  getSelectedPlace,
  isPlaceLoading,
  isPlaceNotFound,
} from './selected-place-selectors';

describe('Selected place selectors', () => {
  it('should return selected place place from state', () => {
    const mockSelectedPlace = {
      detailedInfo: mockPlaceDetails(),
      nearPlaces: [mockPlace()],
      reviews: [mockReview()],
    };
    const state = {
      selectedPlace: {
        selectedPlace: mockSelectedPlace,
        isLoading: false,
        isNotFound: false,
      },
    };

    const result = getSelectedPlace(state);

    expect(result).toEqual(mockSelectedPlace);
  });

  it('should return isLoading from state with true', () => {
    const isLoading = true;
    const state = {
      selectedPlace: {
        selectedPlace: undefined,
        isLoading,
        isNotFound: false,
      },
    };

    const result = isPlaceLoading(state);

    expect(result).toEqual(isLoading);
  });

  it('should return isLoading from state with false', () => {
    const isLoading = false;
    const state = {
      selectedPlace: {
        selectedPlace: undefined,
        isLoading,
        isNotFound: false,
      },
    };

    const result = isPlaceLoading(state);

    expect(result).toEqual(isLoading);
  });

  it('should return isNotFound from state with true', () => {
    const isNotFound = true;
    const state = {
      selectedPlace: {
        selectedPlace: undefined,
        isLoading: false,
        isNotFound,
      },
    };

    const result = isPlaceNotFound(state);

    expect(result).toEqual(isNotFound);
  });

  it('should return isNotFound from state with false', () => {
    const isNotFound = false;
    const state = {
      selectedPlace: {
        selectedPlace: undefined,
        isLoading: false,
        isNotFound,
      },
    };

    const result = isPlaceNotFound(state);

    expect(result).toEqual(isNotFound);
  });
});
