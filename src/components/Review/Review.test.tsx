import { render, screen } from '@testing-library/react';
import Review from './Review';
import { mockReview } from '../../test-utils/mocks';

describe('Review', () => {
  const review = mockReview();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render user name and avatar', () => {
    render(<Review review={review} />);

    expect(screen.getByText(review.user.name)).toBeInTheDocument();
    expect(screen.getByAltText('Reviews avatar')).toBeInTheDocument();
    expect(screen.getByAltText('Reviews avatar')).toHaveAttribute(
      'src',
      review.user.avatarUrl,
    );
  });

  it('should render review comment', () => {
    render(<Review review={review} />);

    expect(screen.getByText(review.comment)).toBeInTheDocument();
  });

  it('should render rating stars with correct width', () => {
    render(<Review review={review} />);

    const ratingSpan = screen.getByText('Rating').previousSibling;
    expect(ratingSpan).toHaveStyle(`width: ${review.rating * 20}%`);
  });
});
