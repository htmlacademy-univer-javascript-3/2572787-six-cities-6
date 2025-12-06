import Map from '../Map/Map';
import PlaceCards from '../PlaceCards/PlaceCards';
import PlaceType from '../../types/place-type';
import useHoveredPlace from '../../hooks/use-hovered-place';

type NearPlacesProps = {
  currentPlace: PlaceType;
  nearPlaces: PlaceType[];
};

function NearPlaces({
  currentPlace,
  nearPlaces,
}: NearPlacesProps): JSX.Element {
  const places = [...nearPlaces, currentPlace];
  const [hoveredPlace, handleHover] = useHoveredPlace(currentPlace);

  return (
    <>
      <Map
        city={currentPlace.city}
        block="offer"
        selectedPoint={hoveredPlace}
        points={places}
      />
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">
            Other places in the neighbourhood
          </h2>
          <PlaceCards
            places={nearPlaces}
            block="near-places"
            cardImageSize="big"
            onCardHover={handleHover}
          />
        </section>
      </div>
    </>
  );
}

export default NearPlaces;
