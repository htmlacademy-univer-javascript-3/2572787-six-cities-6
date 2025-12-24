import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import FavoritesPage from './FavoritesPage';
import { withHistory, withStore } from '../../test-utils/mock-components';
import { mockPlace } from '../../test-utils/mocks';
import AuthorizationStatus from '../../const/authorization-status';

vi.mock('../../components/Logo/Logo', () => ({
  default: () => <div>Logo</div>,
}));
vi.mock('../../components/Header/Header', () => ({
  default: () => <header>Header</header>,
}));

describe('FavoritesPage', () => {
  const mockHistory = createMemoryHistory();

  it('renders title and structure', () => {
    const componentWithHistory = withHistory(<FavoritesPage />, mockHistory);
    const { withStoreComponent } = withStore(componentWithHistory, {
      user: {
        favoritePlaces: [mockPlace()],
      },
      auth: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });

    render(withStoreComponent);

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Logo')).toBeInTheDocument();
  });

  it('renders favorites when available', () => {
    const place = mockPlace();
    place.city.name = 'Paris';
    const componentWithHistory = withHistory(<FavoritesPage />, mockHistory);
    const { withStoreComponent } = withStore(componentWithHistory, {
      user: {
        favoritePlaces: [place],
      },
      auth: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });

    render(withStoreComponent);

    expect(screen.getByText('Paris')).toBeInTheDocument();
  });
});
