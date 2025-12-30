import { MemoryHistory, createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './protected-route';
import { render, screen } from '@testing-library/react';
import AppRoute from '../../const/app-route';
import { withHistory, withStore } from '../../test-utils/mock-components';
import AuthorizationStatus from '../../const/authorization-status';

describe('Protected route', () => {
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push(AppRoute.Main);
  });

  it('should render component for public route, when user not authorized', () => {
    const expectedText = 'public route';
    const notExpectedText = 'protected route';
    const componentWithHistory = withHistory(
      <Routes>
        <Route path={AppRoute.Login} element={<span>{expectedText}</span>} />
        <Route
          path={AppRoute.Main}
          element={
            <ProtectedRoute
              redirectTo={AppRoute.Login}
              restrictedFor={AuthorizationStatus.NoAuth}
            >
              <span>{notExpectedText}</span>
            </ProtectedRoute>
          }
        />
      </Routes>,
      mockHistory,
    );
    const { withStoreComponent } = withStore(componentWithHistory, {
      auth: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('should render component for protected route, when user authorized', () => {
    const expectedText = 'protected route';
    const notExpectedText = 'public route';
    const componentWithHistory = withHistory(
      <Routes>
        <Route path={AppRoute.Login} element={<span>{notExpectedText}</span>} />
        <Route
          path={AppRoute.Main}
          element={
            <ProtectedRoute
              redirectTo={AppRoute.Login}
              restrictedFor={AuthorizationStatus.NoAuth}
            >
              <span>{expectedText}</span>
            </ProtectedRoute>
          }
        />
      </Routes>,
      mockHistory,
    );
    const { withStoreComponent } = withStore(componentWithHistory, {
      auth: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });
});
