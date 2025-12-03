import AuthorizationStatus from '../../const/authorization-status';
import useAppSelector from '../../hooks/use-app-selector';
import ReviewType from '../../types/review-type';
import Review from '../Review/Review';
import ReviewForm from '../ReviewForm/ReviewForm';

type ReviewsProps = {
  reviews: ReviewType[];
};

function Reviews({ reviews }: ReviewsProps): JSX.Element {
  const authorizationStatus = useAppSelector(
    (state) => state.authorizationStatus,
  );

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot;{' '}
        <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <li key={review.id} className="reviews__item">
            <Review review={review} />
          </li>
        ))}
      </ul>
      {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm />}
    </section>
  );
}

export default Reviews;
