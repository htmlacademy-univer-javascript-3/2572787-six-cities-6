import { useEffect } from 'react';
import MainPage from '../../pages/main-page/main-page';
import { Routes, Route } from 'react-router-dom';
import AppRoute from '../../const/app-route';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import PlacePage from '../../pages/place-page/place-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import ProtectedRoute from '../protected-route/protected-route';
import AuthorizationStatus from '../../const/authorization-status';
import {
  checkUserToken,
  fetchFavoritePlacesAction,
  fetchPlacesAction,
} from '../../store/api-actions';
import useAppDispatch from '../../hooks/use-app-dispatch';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUserToken());
    dispatch(fetchPlacesAction());
    dispatch(fetchFavoritePlacesAction());
  }, [dispatch]);

  return (
    <Routes>
      <Route path={AppRoute.Main} element={<MainPage />} />
      <Route
        path={AppRoute.Login}
        element={
          <ProtectedRoute
            restrictedFor={AuthorizationStatus.Auth}
            redirectTo={AppRoute.Main}
          >
            <LoginPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={AppRoute.Favorites}
        element={
          <ProtectedRoute
            restrictedFor={AuthorizationStatus.NoAuth}
            redirectTo={AppRoute.Login}
          >
            <FavoritesPage />
          </ProtectedRoute>
        }
      />
      <Route path={`${AppRoute.Offer}/:id`} element={<PlacePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
