import MainPage from '../../pages/MainPage/MainPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppRoute from '../../const/app-route';
import LoginPage from '../../pages/LoginPage/LoginPage';
import FavouritesPage from '../../pages/FavouritesPage/FavouritesPage';
import OfferPage from '../../pages/OfferPage/OfferPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
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
          element={<LoginPage />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <FavouritesPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
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
