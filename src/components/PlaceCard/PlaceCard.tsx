import { Link } from 'react-router-dom';
import AppRoute from '../../const/app-route';
import PlaceType from '../../types/place-type';

type PlaceCardProps = {
  place: PlaceType;
};

function PlaceCard({ place }: PlaceCardProps): JSX.Element {
  const { id, name, type, imageUrl, price, rating, isPremium, inBookmarks } = place;
  const maxRating = 5;
  const ratingWidthPercentage = (rating / maxRating) * 100;

  return (
    <article className="cities__card place-card">
      {
        isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.Offer}/${id}`}>
          <img className="place-card__image" src={imageUrl} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${inBookmarks && 'place-card__bookmark-button--active'} button`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{inBookmarks ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${ratingWidthPercentage}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${id}`}>{name}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
