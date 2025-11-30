import Cities from '../../components/Cities/Cities';
import useAppSelector from '../../hooks/use-app-selector';
import useAppDispatch from '../../hooks/use-app-dispatch';
import cityNames from '../../const/cities';
import { changeCity } from '../../store/actions';
import classNames from 'classnames';
import Header from '../../components/Header/Header';

function MainPage(): JSX.Element {
  const city = useAppSelector((state) => state.city);
  const places = useAppSelector((state) => state.places);
  const dispatch = useAppDispatch();

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
        <Cities city={city} places={places} />
      </main>
    </div>
  );
}

export default MainPage;
