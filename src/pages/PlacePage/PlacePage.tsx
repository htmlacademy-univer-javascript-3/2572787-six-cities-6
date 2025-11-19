import Logo from '../../components/Logo/Logo';
import { Navigate, useParams } from 'react-router-dom';
import AppRoute from '../../const/app-route';
import Bookmark from '../../components/Bookmark/Bookmark';
import Reviews from '../../components/Reviews/Reviews';
import ReviewType from '../../types/review-type';
import Map from '../../components/Map/Map';
import { useState } from 'react';
import PlaceType from '../../types/place-type';
import PlaceCards from '../../components/PlaceCards/PlaceCards';
import useAppSelector from '../../hooks/use-app-selector';
import classNames from 'classnames';

type PlacePageProps = {
  reviews: ReviewType[];
};

function PlacePage({ reviews }: PlacePageProps): JSX.Element {
  const { id } = useParams();
  const places = useAppSelector((state) => state.places);
  const place = places.find((e) => e.id === id);
  const nearPlaces = places.filter((e) => e.id !== id);

  const [selectedPlace, setSelectedPlace] = useState<PlaceType | undefined>(
    place,
  );

  const handleCardHover = (hoveredPlace: PlaceType | undefined) => {
    if (hoveredPlace) {
      setSelectedPlace(hoveredPlace);
      return;
    }

    setSelectedPlace(place);
  };

  if (!place) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  const maxRating = 5;
  const ratingWidthPercentage = (place.rating / maxRating) * 100;

  return (
    <div className="page">
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

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {place.images.map((imageUrl) => (
                <div
                  key={`${place.id}_${btoa(imageUrl)}`}
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
              {place.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{place.title}</h1>
                <Bookmark
                  block="offer"
                  bookmarkSize={{ width: '31', height: '33' }}
                  inBookmarks={place.isFavorite}
                />
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${ratingWidthPercentage}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {place.rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {place.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {place.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {place.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{place.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {place.goods.map((good) => (
                    <li
                      key={`${place.id}_${btoa(good)}`}
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
                        'offer__avatar-wrapper--pro': place.host.isPro,
                      },
                    )}
                  >
                    <img
                      className="offer__avatar user__avatar"
                      src={place.host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{place.host.name}</span>
                  <span className="offer__user-status">
                    {place.host.isPro ? 'Pro' : 'Basic'}
                  </span>
                </div>
                <div className="offer__description">
                  {place.description.split('\n').map((paragraph) => (
                    <p
                      key={`${place.id}_${btoa(paragraph)}`}
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
            city={place.city}
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
