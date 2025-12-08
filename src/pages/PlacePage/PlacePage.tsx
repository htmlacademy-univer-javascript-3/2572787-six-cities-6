import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import AppRoute from '../../const/app-route';
import Bookmark from '../../components/Bookmark/Bookmark';
import Reviews from '../../components/Reviews/Reviews';
import useAppSelector from '../../hooks/use-app-selector';
import useAppDispatch from '../../hooks/use-app-dispatch';
import {
  addPlaceToFavorites,
  fetchPlaceAction,
  removePlaceFromFavorites,
} from '../../store/api-actions';
import Spinner from '../../components/Spinner/Spinner';
import Header from '../../components/Header/Header';
import NearPlaces from '../../components/NearPlaces/NearPlaces';
import { toPlaceType } from '../../helpers/place-mapper';
import {
  getSelectedPlace,
  isPlaceLoading,
  isPlaceNotFound,
} from '../../store/selectors/selected-place-selectors';
import { markAsNotFound } from '../../store/slices/selected-place';

function PlacePage(): JSX.Element {
  const { id } = useParams();
  const place = useAppSelector(getSelectedPlace);
  const isLoading = useAppSelector(isPlaceLoading);
  const isNotFound = useAppSelector(isPlaceNotFound);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchPlaceAction({ id }));
    } else {
      dispatch(markAsNotFound());
    }
  }, [id, dispatch]);

  if (isNotFound) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  if (isLoading || !place) {
    return <Spinner />;
  }

  const { detailedInfo, nearPlaces, reviews } = place;

  const handleBookmarkClick = (checked: boolean) => {
    if (checked) {
      dispatch(addPlaceToFavorites(detailedInfo));
    } else {
      dispatch(removePlaceFromFavorites(detailedInfo));
    }
  };

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
                  onBookmarkClick={handleBookmarkClick}
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
        </section>
        <NearPlaces
          currentPlace={toPlaceType(detailedInfo)}
          nearPlaces={nearPlaces}
        />
      </main>
    </div>
  );
}

export default PlacePage;
