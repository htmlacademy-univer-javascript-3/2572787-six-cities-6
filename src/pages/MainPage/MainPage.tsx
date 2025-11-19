import Logo from '../../components/Logo/Logo';
import Cities from '../../components/Cities/Cities';
import AppRoute from '../../const/app-route';
import useAppSelector from '../../hooks/use-app-selector';
import useAppDispatch from '../../hooks/use-app-dispatch';
import cityNames from '../../const/cities';
import { changeCity } from '../../store/action';

function MainPage(): JSX.Element {
  const city = useAppSelector((state) => state.city);
  const places = useAppSelector((state) => state.places);
  const dispatch = useAppDispatch();

  const handleChangeCity = (cityName: string) => {
    dispatch(changeCity({ city: cityName }));
  };

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href={AppRoute.Favorites}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {cityNames.map((cityName) => (
                <li key={btoa(cityName)} className="locations__item">
                  <a
                    className={`locations__item-link tabs__item ${cityName === city.name ? 'tabs__item--active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleChangeCity(cityName);
                    }}
                  >
                    <span>{cityName}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <Cities city={city} places={places} />
      </main>
    </div>
  );
}

export default MainPage;
