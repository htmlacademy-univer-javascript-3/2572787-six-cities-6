import { useState } from 'react';
import PlaceType from '../../types/place-type';
import Map from '../Map/Map';
import CityType from '../../types/city-type';
import PlaceCards from '../PlaceCards/PlaceCards';
import Sorting from '../Sorting/Sorting';
import { SortOption } from '../../types/sort-options';
import { sortPlaces } from '../../helpers/place-sort-helper';
import useHoveredPlace from '../../hooks/use-hovered-place';

type CitiesProps = {
  city: CityType;
  places: PlaceType[];
};

function Cities({ city, places }: CitiesProps): JSX.Element {
  const [hoveredPlace, setHoveredPlace] = useHoveredPlace();
  const [sortOption, setSortOption] = useState<SortOption>('Popular');

  const placesInCity = places.filter((place) => place.city.name === city.name);
  const sortedPlaces = sortPlaces(placesInCity, sortOption);

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">
            {sortedPlaces.length} places to stay in {city.name}
          </b>
          <Sorting
            currentSortOption={sortOption}
            onSortChange={(option) => setSortOption(option)}
          />
          <PlaceCards
            places={sortedPlaces}
            block="cities"
            cardImageSize="big"
            onCardHover={setHoveredPlace}
          />
        </section>
        <div className="cities__right-section">
          <Map
            city={city}
            block="cities"
            points={sortedPlaces}
            selectedPoint={hoveredPlace}
          />
        </div>
      </div>
    </div>
  );
}

export default Cities;
