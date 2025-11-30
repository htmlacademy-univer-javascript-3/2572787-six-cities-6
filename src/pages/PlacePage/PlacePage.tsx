import { Navigate, useParams } from 'react-router-dom';
import AppRoute from '../../const/app-route';
import Bookmark from '../../components/Bookmark/Bookmark';
import Reviews from '../../components/Reviews/Reviews';
import ReviewType from '../../types/review-type';
import Map from '../../components/Map/Map';
import { useEffect, useState } from 'react';
import PlaceType from '../../types/place-type';
import PlaceCards from '../../components/PlaceCards/PlaceCards';
import useAppSelector from '../../hooks/use-app-selector';
import classNames from 'classnames';
import useAppDispatch from '../../hooks/use-app-dispatch';
import { updateSelectedPlace } from '../../store/actions';
import { fetchPlaceAction } from '../../store/api-actions';
import { toPlaceType } from '../../helpers/place-mapper';
import Spinner from '../../components/Spinner/Spinner';
import Header from '../../components/Header/Header';

type PlacePageProps = {
  reviews: ReviewType[];
};

function PlacePage({ reviews }: PlacePageProps): JSX.Element {
  const { id } = useParams();
  const place = useAppSelector((state) => state.selectedPlace);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateSelectedPlace({ place: undefined }));
    if (id) {
      dispatch(fetchPlaceAction({ id }));
    }
  }, [id, dispatch]);

  const [selectedPlace, setSelectedPlace] = useState<PlaceType | undefined>(
    undefined,
  );

  if (!place) {
    return <Spinner />;
  }

  const { detailedInfo, nearPlaces } = place;
  const mappedPlace = toPlaceType(detailedInfo);
  const places = [...nearPlaces, mappedPlace];

  const handleCardHover = (hoveredPlace: PlaceType | undefined) => {
    if (hoveredPlace) {
      setSelectedPlace(hoveredPlace);
      return;
    }

    setSelectedPlace(mappedPlace);
  };

  if (!place) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  const maxRating = 5;
  const ratingWidthPercentage = (detailedInfo.rating / maxRating) * 100;

  return (
    <div className="page">
      <Header showUserInfo />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {detailedInfo.images.map((imageUrl) => (
                <div
                  key={`${detailedInfo.id}_${btoa(imageUrl)}`}
                  className="offer__image-wrapper"
                >
                  <img
                    className="offer__image"
                    src={imageUrl}
                    alt="Photo studio"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {detailedInfo.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{detailedInfo.title}</h1>
                <Bookmark
                  block="offer"
                  bookmarkSize={{ width: '31', height: '33' }}
                  inBookmarks={detailedInfo.isFavorite}
                />
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${ratingWidthPercentage}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {detailedInfo.rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {detailedInfo.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {detailedInfo.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {detailedInfo.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{detailedInfo.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {detailedInfo.goods.map((good) => (
                    <li
                      key={`${detailedInfo.id}_${btoa(good)}`}
                      className="offer__inside-item"
                    >
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div
                    className={classNames(
                      'offer__avatar-wrapper',
                      'user__avatar-wrapper',
                      {
                        'offer__avatar-wrapper--pro': detailedInfo.host.isPro,
                      },
                    )}
                  >
                    <img
                      className="offer__avatar user__avatar"
                      src={detailedInfo.host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">
                    {detailedInfo.host.name}
                  </span>
                  <span className="offer__user-status">
                    {detailedInfo.host.isPro ? 'Pro' : 'Basic'}
                  </span>
                </div>
                <div className="offer__description">
                  {detailedInfo.description.split('\n').map((paragraph) => (
                    <p
                      key={`${detailedInfo.id}_${btoa(paragraph)}`}
                      className="offer__text"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              <Reviews reviews={reviews} />
            </div>
          </div>
          <Map
            city={detailedInfo.city}
            block="offer"
            selectedPoint={selectedPlace}
            points={places}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <PlaceCards
              places={nearPlaces}
              block="near-places"
              cardImageSize="big"
              onCardHover={handleCardHover}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default PlacePage;
