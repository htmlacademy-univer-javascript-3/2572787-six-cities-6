import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import PlacePage from './place-page';
import { withHistory, withStore } from '../../test-utils/mock-components';
import AppRoute from '../../const/app-route';
import {
  mockPlace,
  mockPlaceDetails,
  mockReview,
  mockUserInfo,
} from '../../test-utils/mocks';
import AuthorizationStatus from '../../const/authorization-status';

vi.mock('../../components/Spinner/Spinner', () => {
  const mockSpinner = () => <span>Loading...</span>;

  return {
    default: mockSpinner,
  };
});

vi.mock('../../components/NearPlaces/NearPlaces', () => {
  const mockNearPlaces = () => <span>Near Places</span>;

  return {
    default: mockNearPlaces,
  };
});

vi.mock('../../components/Reviews/Reviews', () => {
  const mockReviews = () => <span>Reviews</span>;

  return {
    default: mockReviews,
  };
});

describe('PlacePage basic states', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('shows loading spinner when loading', () => {
    const componentWithHistory = withHistory(<PlacePage />, mockHistory);
    const { withStoreComponent } = withStore(componentWithHistory, {
      selectedPlace: {
        selectedPlace: undefined,
        isLoading: true,
        isNotFound: false,
      },
      user: {
        userInfo: mockUserInfo(),
        favoritePlaces: [],
      },
      auth: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });
    const expectedText = 'Loading...';

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('redirects to "/not-found" when place not found', () => {
    const componentWithHistory = withHistory(<PlacePage />, mockHistory);
    const { withStoreComponent } = withStore(componentWithHistory, {
      selectedPlace: {
        selectedPlace: undefined,
        isLoading: false,
        isNotFound: true,
      },
      user: {
        userInfo: mockUserInfo(),
        favoritePlaces: [],
      },
      auth: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });

    render(withStoreComponent);

    expect(mockHistory.location.pathname).toEqual(AppRoute.NotFound);
  });

  it('renders place when found and loaded', () => {
    const mockedPlace = mockPlaceDetails();
    const componentWithHistory = withHistory(<PlacePage />, mockHistory);
    const { withStoreComponent } = withStore(componentWithHistory, {
      selectedPlace: {
        selectedPlace: {
          detailedInfo: mockedPlace,
          nearPlaces: [mockPlace()],
          reviews: [mockReview()],
        },
        isLoading: false,
        isNotFound: false,
      },
      user: {
        userInfo: mockUserInfo(),
        favoritePlaces: [],
      },
      auth: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });

    render(withStoreComponent);

    expect(screen.getByText(mockedPlace.title)).toBeInTheDocument();
    expect(screen.getByText(`€${mockedPlace.price}`)).toBeInTheDocument();
    expect(screen.getByText(mockedPlace.type)).toBeInTheDocument();
    expect(screen.getByText('Reviews')).toBeInTheDocument();
    expect(screen.getByText('Near Places')).toBeInTheDocument();
  });
});
