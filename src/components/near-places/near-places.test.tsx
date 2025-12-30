import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import NearPlaces from './near-places';
import { withHistory, withStore } from '../../test-utils/mock-components';
import { mockPlace } from '../../test-utils/mocks';

vi.mock('../Map/Map', () => ({
  default: () => <div data-testid="map">Map</div>,
}));

vi.mock('../PlaceCards/PlaceCards', () => ({
  default: () => <div data-testid="place-cards">PlaceCards</div>,
}));

describe('NearPlaces', () => {
  const mockHistory = createMemoryHistory();
  const mockCurrentPlace = mockPlace();
  const mockNearPlaces = [mockPlace(), mockPlace()];

  it('renders title and components', () => {
    const { withStoreComponent } = withStore(
      withHistory(
        <NearPlaces
          currentPlace={mockCurrentPlace}
          nearPlaces={mockNearPlaces}
        />,
        mockHistory,
      ),
      {},
    );

    render(withStoreComponent);

    expect(
      screen.getByText('Other places in the neighbourhood'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getByTestId('place-cards')).toBeInTheDocument();
  });
});
