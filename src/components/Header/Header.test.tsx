import { MemoryHistory, createMemoryHistory } from 'history';
import { withHistory, withStore } from '../../test-utils.ts/mock-components';
import Header from './Header';
import { render, screen } from '@testing-library/react';
import { mockUserInfo } from '../../test-utils.ts/mocks';
import userEvent from '@testing-library/user-event';
import AppRoute from '../../const/app-route';

describe('Header', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render correctly when not show user info', () => {
    const componentWithHistory = withHistory(<Header />, mockHistory);
    const { withStoreComponent } = withStore(componentWithHistory, {
      user: {
        userInfo: undefined,
        favoritePlaces: [],
      },
    });

    render(withStoreComponent);

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('should render correctly when show user info and no auth', () => {
    const componentWithHistory = withHistory(
      <Header showUserInfo />,
      mockHistory,
    );
    const { withStoreComponent } = withStore(componentWithHistory, {
      user: {
        userInfo: undefined,
        favoritePlaces: [],
      },
    });
    const expectedText = 'Sign in';

    render(withStoreComponent);

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render correctly when show user info and auth', () => {
    const componentWithHistory = withHistory(
      <Header showUserInfo />,
      mockHistory,
    );
    const mockUser = mockUserInfo();
    const { withStoreComponent } = withStore(componentWithHistory, {
      user: {
        userInfo: mockUser,
        favoritePlaces: [],
      },
    });
    const expectedText = 'Sign out';

    render(withStoreComponent);

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    expect(screen.getByAltText('Header avatar')).toBeInTheDocument();
  });

  it('should redirect to "/login" when no auth and clicked to link', async () => {
    const componentWithHistory = withHistory(
      <Header showUserInfo />,
      mockHistory,
    );
    const { withStoreComponent } = withStore(componentWithHistory, {
      user: {
        userInfo: undefined,
        favoritePlaces: [],
      },
    });
    const expectedRoute = AppRoute.Login;

    render(withStoreComponent);
    await userEvent.click(screen.getAllByRole('link')[1]);

    expect(mockHistory.location.pathname).toEqual(expectedRoute);
  });

  it('should redirect to "/favorites" when auth and clicked to link', async () => {
    const componentWithHistory = withHistory(
      <Header showUserInfo />,
      mockHistory,
    );
    const { withStoreComponent } = withStore(componentWithHistory, {
      user: {
        userInfo: mockUserInfo(),
        favoritePlaces: [],
      },
    });
    const expectedRoute = AppRoute.Favorites;

    render(withStoreComponent);
    await userEvent.click(screen.getAllByRole('link')[1]);

    expect(mockHistory.location.pathname).toEqual(expectedRoute);
  });
});
