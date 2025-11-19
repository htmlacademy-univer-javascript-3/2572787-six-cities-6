import MainPage from '../../pages/MainPage/MainPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppRoute from '../../const/app-route';
import LoginPage from '../../pages/LoginPage/LoginPage';
import FavoritesPage from '../../pages/FavoritesPage/FavoritesPage';
import PlacePage from '../../pages/PlacePage/PlacePage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AuthorizationStatus from '../../const/authorization-status';
import ReviewType from '../../types/review-type';

type AppProps = {
  reviews: ReviewType[];
};

function App({ reviews }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
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
        <Route
          path={`${AppRoute.Offer}/:id`}
          element={<PlacePage reviews={reviews} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
