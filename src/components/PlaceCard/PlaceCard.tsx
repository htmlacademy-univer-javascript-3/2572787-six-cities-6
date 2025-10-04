import { Link } from 'react-router-dom';
import AppRoute from '../../const/app-route';
import PlaceType from '../../types/place-type';
import Bookmark from '../Bookmark/Bookmark';

type PlaceCardProps = {
  place: PlaceType;
  block: 'cities' | 'favorites';
  previewImageSize: {
    width: string;
    height: string;
  };
  onCardHover?: (id: PlaceType['id'] | null) => void;
};

function PlaceCard({
  place,
  block,
  previewImageSize,
  onCardHover,
}: PlaceCardProps): JSX.Element {
  const { id, title, type, images, price, rating, isPremium, isFavorite } =
    place;
  const [previewImageUrl] = images;
  const maxRating = 5;
  const ratingWidthPercentage = (rating / maxRating) * 100;

  return (
    <article
      className={`${block}__card place-card`}
      onMouseEnter={() => onCardHover?.(id)}
      onMouseLeave={() => onCardHover?.(null)}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${block}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.Offer}/${id}`}>
          <img
            className="place-card__image"
            src={previewImageUrl}
            width={previewImageSize.width}
            height={previewImageSize.height}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <Bookmark
            block="place-card"
            bookmarkSize={{ width: '18', height: '19' }}
            inBookmarks={isFavorite}
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${ratingWidthPercentage}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
