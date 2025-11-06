import PlaceType from '../../types/place-type';
import { useState } from 'react';
import Map from '../Map/Map';
import CityType from '../../types/city-type';
import PlaceCards from '../PlaceCards/PlaceCards';

type CitiesProps = {
  city: CityType;
  places: PlaceType[];
};

function Cities({ city, places }: CitiesProps): JSX.Element {
  const [hoveredPlace, setHoveredPlace] = useState<PlaceType | undefined>(
    undefined,
  );

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">312 places to stay in Amsterdam</b>
          <form className="places__sorting" action="#" method="get">
            <span className="places__sorting-caption">Sort by</span>
            <span className="places__sorting-type" tabIndex={0}>
              Popular
              <svg className="places__sorting-arrow" width="7" height="4">
                <use xlinkHref="#icon-arrow-select"></use>
              </svg>
            </span>
            <ul className="places__options places__options--custom places__options--opened">
              <li
                className="places__option places__option--active"
                tabIndex={0}
              >
                Popular
              </li>
              <li className="places__option" tabIndex={0}>
                Price: low to high
              </li>
              <li className="places__option" tabIndex={0}>
                Price: high to low
              </li>
              <li className="places__option" tabIndex={0}>
                Top rated first
              </li>
            </ul>
          </form>
          <PlaceCards
            places={places}
            block="cities"
            cardImageSize="big"
            onCardHover={setHoveredPlace}
          />
        </section>
        <div className="cities__right-section">
          <Map
            city={city}
            block="cities"
            points={places}
            selectedPoint={hoveredPlace}
          />
        </div>
      </div>
    </div>
  );
}

export default Cities;
