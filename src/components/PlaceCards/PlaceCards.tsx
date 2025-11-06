import PlaceType from '../../types/place-type';
import PlaceCard from '../PlaceCard/PlaceCard';

const placeCardsBlockClasses = {
  cities: 'cities__places-list places__list tabs__content',
  favorites: 'favorites__places',
  'near-places': 'near-places__list places__list',
};

type PlaceCardsProps = {
  places: PlaceType[];
  block: 'cities' | 'favorites' | 'near-places';
  cardImageSize: 'big' | 'small';
  onCardHover?: (place: PlaceType | undefined) => void;
};

function PlaceCards({
  places,
  block,
  cardImageSize,
  onCardHover,
}: PlaceCardsProps): JSX.Element {
  return (
    <div className={placeCardsBlockClasses[block]}>
      {places.map((place) => (
        <PlaceCard
          key={place.id}
          place={place}
          block={block}
          imageSize={cardImageSize}
          onCardHover={onCardHover}
        />
      ))}
    </div>
  );
}

export default PlaceCards;
