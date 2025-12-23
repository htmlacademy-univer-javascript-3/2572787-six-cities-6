import { createMemoryHistory, MemoryHistory } from 'history';
import { withHistory, withStore } from '../../test-utils/mock-components';
import App from './App';
import AppRoute from '../../const/app-route';
import { render, screen } from '@testing-library/react';
import AuthorizationStatus from '../../const/authorization-status';

vi.mock('../../pages/MainPage/MainPage', () => {
  const mockMainPage = () => <span>Main page</span>;

  return {
    default: mockMainPage,
  };
});

vi.mock('../../pages/LoginPage/LoginPage', () => {
  const mockLoginPage = () => <span>Login page</span>;

  return {
    default: mockLoginPage,
  };
});

vi.mock('../../pages/FavoritesPage/FavoritesPage', () => {
  const mockFavoritesPage = () => <span>Favorites page</span>;

  return {
    default: mockFavoritesPage,
  };
});

vi.mock('../../pages/NotFoundPage/NotFoundPage', () => {
  const mockNotFoundPage = () => <span>NotFound page</span>;

  return {
    default: mockNotFoundPage,
  };
});

vi.mock('../../pages/PlacePage/PlacePage', () => {
  const mockPlacePage = () => <span>Place page</span>;

  return {
    default: mockPlacePage,
  };
});

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "MainPage" when user navigate to "/"', () => {
    const componentWithHistory = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(componentWithHistory, {});
    const expectedText = 'Main page';
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render "LoginPage" when user navigate to "/login"', () => {
    const componentWithHistory = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(componentWithHistory, {
      auth: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });
    const expectedText = 'Login page';
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render "FavoritesPage" when user navigate to "/favorites"', () => {
    const componentWithHistory = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(componentWithHistory, {
      auth: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });
    const expectedText = 'Favorites page';
    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render "PlacePage" when user navigate to "/offer/:id"', () => {
    const componentWithHistory = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(componentWithHistory, {});
    const expectedText = 'Place page';
    mockHistory.push(`${AppRoute.Offer}/123`);

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when user navigate to non-existent route', () => {
    const componentWithHistory = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(componentWithHistory, {});
    const expectedText = 'NotFound page';
    mockHistory.push('/not-existent-route');

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
