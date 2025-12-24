import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import Cities from './Cities';
import { withHistory, withStore } from '../../test-utils/mock-components';
import { mockPlace } from '../../test-utils/mocks';
import cities from '../../mocks/cities';

vi.mock('../Map/Map', () => ({
  default: () => <div data-testid="map">Map</div>,
}));

vi.mock('../PlaceCards/PlaceCards', () => ({
  default: () => <div data-testid="place-cards">PlaceCards</div>,
}));

vi.mock('../Sorting/Sorting', () => ({
  default: () => <div data-testid="sorting">Sorting</div>,
}));

describe('Cities', () => {
  const mockHistory = createMemoryHistory();
  const mockCity = cities[0];
  const mockPlaces = [mockPlace(), mockPlace()];

  it('renders city info and components', () => {
    const { withStoreComponent } = withStore(
      withHistory(<Cities city={mockCity} places={mockPlaces} />, mockHistory),
      {},
    );

    render(withStoreComponent);

    expect(screen.getByText('2 places to stay in Paris')).toBeInTheDocument();
    expect(screen.getByTestId('sorting')).toBeInTheDocument();
    expect(screen.getByTestId('place-cards')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});
