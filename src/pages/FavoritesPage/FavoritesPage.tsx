import Logo from '../../components/Logo/Logo';
import PlaceCards from '../../components/PlaceCards/PlaceCards';
import useAppSelector from '../../hooks/use-app-selector';
import Header from '../../components/Header/Header';
import { getFavoritePlaces } from '../../store/selectors/user-selectors';
import cities from '../../const/cities';
import classNames from 'classnames';

function FavoritesPage(): JSX.Element {
  const favoritePlaces = useAppSelector(getFavoritePlaces);

  return (
    <div className="page">
      <Header showUserInfo />
      <main
        className={classNames('page__main', 'page__main--favorites', {
          'page__main--favorites-empty': favoritePlaces.length === 0,
        })}
      >
        <div className="page__favorites-container container">
          {favoritePlaces.length === 0 ? (
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">
                  Save properties to narrow down search or plan your future
                  trips.
                </p>
              </div>
            </section>
          ) : (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {cities.map((cityName) => {
                  const favoriteInCity = favoritePlaces.filter(
                    (place) => place.city.name === cityName,
                  );

                  if (favoriteInCity.length) {
                    return (
                      <li
                        key={btoa(cityName)}
                        className="favorites__locations-items"
                      >
                        <div className="favorites__locations locations locations--current">
                          <div className="locations__item">
                            <a className="locations__item-link" href="#">
                              <span>{cityName}</span>
                            </a>
                          </div>
                        </div>
                        <PlaceCards
                          places={favoriteInCity}
                          block="favorites"
                          cardImageSize="small"
                        />
                      </li>
                    );
                  }
                })}
              </ul>
            </section>
          )}
        </div>
      </main>
      <footer className="footer container">
        <Logo />
      </footer>
    </div>
  );
}

export default FavoritesPage;
