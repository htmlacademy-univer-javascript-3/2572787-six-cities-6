import { Fragment, ChangeEvent, useState, FormEvent } from 'react';
import { RATINGS } from '../../const/ratings';

function ReviewForm(): JSX.Element {
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');

  const handleRatingChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setRating(value);
  };

  const handleReviewChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setReview(value);
  };

  const handleReviewSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRating('');
    setReview('');
  };

  return (
    <form className="reviews__form form" onSubmit={handleReviewSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {RATINGS.map(({ value, title }) => (
          <Fragment key={`rating-${value}`}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              checked={rating === value}
              onChange={handleRatingChange}
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={title}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review}
        onChange={handleReviewChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={rating.length === 0 || review.length < 50}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
