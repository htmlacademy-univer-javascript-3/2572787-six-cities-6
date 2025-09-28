import MainPage from '../../pages/MainPage/MainPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppRoute from '../../const/app-route';
import LoginPage from '../../pages/LoginPage/LoginPage';
import FavouritesPage from '../../pages/FavouritesPage/FavouritesPage';
import OfferPage from '../../pages/OfferPage/OfferPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AuthorizationStatus from '../../const/authorization-status';

type AppProps = {
  placeCardsNumber: number;
}

function App({ placeCardsNumber }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage placeCardsNumber={placeCardsNumber} />}
        />
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
              <FavouritesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={`${AppRoute.Offer}/:id`}
          element={<OfferPage />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
