import classNames from 'classnames';
import Cities from '../../components/Cities/Cities';
import useAppSelector from '../../hooks/use-app-selector';
import useAppDispatch from '../../hooks/use-app-dispatch';
import cityNames from '../../const/cities';
import Header from '../../components/Header/Header';
import { getCity } from '../../store/selectors/city-selectors';
import { getPlaces } from '../../store/selectors/places-selectors';
import { changeCity } from '../../store/slices/city';
import EmptyCities from '../../components/EmptyCities/EmptyCities';

function MainPage(): JSX.Element {
  const city = useAppSelector(getCity);
  const places = useAppSelector(getPlaces);
  const dispatch = useAppDispatch();

  const placesInCity = places.filter((place) => place.city.name === city.name);

  const handleChangeCity = (cityName: string) => {
    dispatch(changeCity({ city: cityName }));
  };

  return (
    <div className="page page--gray page--main">
      <Header showUserInfo />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {cityNames.map((cityName) => (
                <li key={btoa(cityName)} className="locations__item">
                  <a
                    className={classNames(
                      'locations__item-link',
                      'tabs__item',
                      {
                        'tabs__item--active': cityName === city.name,
                      },
                    )}
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
        {placesInCity.length ? (
          <Cities city={city} places={placesInCity} />
        ) : (
          <EmptyCities city={city} />
        )}
      </main>
    </div>
  );
}

export default MainPage;
