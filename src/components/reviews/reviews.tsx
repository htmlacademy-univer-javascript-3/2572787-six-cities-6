import useAppSelector from '../../hooks/use-app-selector';
import { getIsAuth } from '../../store/selectors/auth-selectors';
import ReviewType from '../../types/review-type';
import Review from '../review/review';
import ReviewForm from '../review-form/review-form';

type ReviewsProps = {
  reviews: ReviewType[];
};

function Reviews({ reviews }: ReviewsProps): JSX.Element {
  const isAuth = useAppSelector(getIsAuth);

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
      {isAuth && <ReviewForm />}
    </section>
  );
}

export default Reviews;
