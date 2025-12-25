import Map from '../Map/Map';
import PlaceCards from '../PlaceCards/PlaceCards';
import PlaceType from '../../types/place-type';

type NearPlacesProps = {
  currentPlace: PlaceType;
  nearPlaces: PlaceType[];
};

function NearPlaces({
  currentPlace,
  nearPlaces,
}: NearPlacesProps): JSX.Element {
  const places = [...nearPlaces, currentPlace];

  return (
    <>
      <Map
        city={currentPlace.city}
        block="offer"
        selectedPoint={currentPlace}
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
          />
        </section>
      </div>
    </>
  );
}

export default NearPlaces;
