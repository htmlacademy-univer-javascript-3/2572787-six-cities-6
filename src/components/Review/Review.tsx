import { formatDate } from '../../helpers/date-helper';
import ReviewType from '../../types/review-type';

type ReviewProps = {
  review: ReviewType;
};

function Review({
  review: {
    author: { name, avatarUrl },
    dateTime,
    text,
    rating,
  },
}: ReviewProps): JSX.Element {
  const maxRating = 5;
  const ratingWidthPercentage = (rating / maxRating) * 100;

  const { date, displayDate } = formatDate(dateTime);

  return (
    <>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${ratingWidthPercentage}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        {text.split('\n').map((paragraph) => (
          <p key={btoa(paragraph)} className="reviews__text">
            {paragraph}
          </p>
        ))}
        <time className="reviews__time" dateTime={date}>
          {displayDate}
        </time>
      </div>
    </>
  );
}

export default Review;
