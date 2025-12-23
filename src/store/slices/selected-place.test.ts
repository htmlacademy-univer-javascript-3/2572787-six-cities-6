import {
  mockPlace,
  mockPlaceDetails,
  mockReview,
} from '../../test-utils.ts/mocks';
import { fetchPlaceAction, sendReview } from '../api-actions';
import selectedPlace, {
  clearSelectedPlace,
  markAsNotFound,
  updateSelectedPlace,
} from './selected-place';

describe('Selected Place Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      selectedPlace: {
        detailedInfo: mockPlaceDetails(),
        nearPlaces: [mockPlace()],
        reviews: [mockReview()],
      },
      isLoading: false,
      isNotFound: false,
    };

    const result = selectedPlace(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      selectedPlace: undefined,
      isLoading: false,
      isNotFound: false,
    };

    const result = selectedPlace(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should update selected place with "updateSelectedPlace" action', () => {
    const initialState = {
      selectedPlace: undefined,
      isLoading: false,
      isNotFound: false,
    };
    const mockSelectedPlace = {
      detailedInfo: mockPlaceDetails(),
      nearPlaces: [mockPlace()],
      reviews: [mockReview()],
    };
    const expectedState = {
      selectedPlace: mockSelectedPlace,
      isLoading: false,
      isNotFound: false,
    };

    const result = selectedPlace(
      initialState,
      updateSelectedPlace({ place: mockSelectedPlace }),
    );

    expect(result).toEqual(expectedState);
  });

  it('should clear selected place with "clearSelectedPlace" action', () => {
    const initialState = {
      selectedPlace: {
        detailedInfo: mockPlaceDetails(),
        nearPlaces: [mockPlace()],
        reviews: [mockReview()],
      },
      isLoading: false,
      isNotFound: false,
    };
    const expectedState = {
      selectedPlace: undefined,
      isLoading: false,
      isNotFound: false,
    };

    const result = selectedPlace(initialState, clearSelectedPlace());

    expect(result).toEqual(expectedState);
  });

  it('should clear selected place with "markAsNotFound" action', () => {
    const initialState = {
      selectedPlace: undefined,
      isLoading: true,
      isNotFound: false,
    };
    const expectedState = {
      selectedPlace: undefined,
      isLoading: false,
      isNotFound: true,
    };

    const result = selectedPlace(initialState, markAsNotFound());

    expect(result).toEqual(expectedState);
  });

  it('should isLoading with "fetchPlaceAction.pending" action', () => {
    const initialState = {
      selectedPlace: undefined,
      isLoading: false,
      isNotFound: false,
    };
    const expectedState = {
      selectedPlace: undefined,
      isLoading: true,
      isNotFound: false,
    };

    const result = selectedPlace(initialState, fetchPlaceAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should update selected place with "fetchPlaceAction.fulfilled" action', () => {
    const initialState = {
      selectedPlace: undefined,
      isLoading: false,
      isNotFound: false,
    };
    const mockSelectedPlace = {
      detailedInfo: mockPlaceDetails(),
      nearPlaces: [mockPlace()],
      reviews: [mockReview()],
    };
    const expectedState = {
      selectedPlace: mockSelectedPlace,
      isLoading: false,
      isNotFound: false,
    };

    const result = selectedPlace(
      initialState,
      fetchPlaceAction.fulfilled(mockSelectedPlace, '', {
        id: mockSelectedPlace.detailedInfo.id,
      }),
    );

    expect(result).toEqual(expectedState);
  });

  it('should isNotFound with "fetchPlaceAction.rejected" action', () => {
    const initialState = {
      selectedPlace: undefined,
      isLoading: true,
      isNotFound: false,
    };
    const expectedState = {
      selectedPlace: undefined,
      isLoading: false,
      isNotFound: true,
    };

    const result = selectedPlace(initialState, fetchPlaceAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should add new review with "sendReview.fulfilled" action', () => {
    const mockSelectedPlace = {
      detailedInfo: mockPlaceDetails(),
      nearPlaces: [mockPlace()],
      reviews: [mockReview()],
    };
    const newReview = mockReview();
    const initialState = {
      selectedPlace: mockSelectedPlace,
      isLoading: false,
      isNotFound: false,
    };
    const expectedState = {
      selectedPlace: {
        ...mockSelectedPlace,
        reviews: mockSelectedPlace.reviews.concat(newReview),
      },
      isLoading: false,
      isNotFound: false,
    };

    const result = selectedPlace(
      initialState,
      sendReview.fulfilled(newReview, '', newReview),
    );

    expect(result).toEqual(expectedState);
  });
});
