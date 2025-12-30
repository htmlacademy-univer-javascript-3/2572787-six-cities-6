import { render, screen } from '@testing-library/react';
import Reviews from './reviews';
import { mockReview } from '../../test-utils/mocks';
import { withStore } from '../../test-utils/mock-components';
import AuthorizationStatus from '../../const/authorization-status';

vi.mock('../review-form/review-form', () => ({
  default: () => <div>Form</div>,
}));

describe('Reviews', () => {
  const mockReviews = [mockReview(), mockReview(), mockReview()];

  it('shows all reviews', () => {
    const { withStoreComponent } = withStore(
      <Reviews reviews={mockReviews} />,
      { auth: { authorizationStatus: AuthorizationStatus.NoAuth } },
    );

    render(withStoreComponent);

    expect(screen.getAllByRole('listitem').length).toBe(mockReviews.length);
  });

  it('shows form when user is auth', () => {
    const { withStoreComponent } = withStore(
      <Reviews reviews={mockReviews} />,
      { auth: { authorizationStatus: AuthorizationStatus.Auth } },
    );

    render(withStoreComponent);

    expect(screen.getByText('Form')).toBeInTheDocument();
  });

  it('hides form when user is not auth', () => {
    const { withStoreComponent } = withStore(
      <Reviews reviews={mockReviews} />,
      { auth: { authorizationStatus: AuthorizationStatus.NoAuth } },
    );

    render(withStoreComponent);

    expect(screen.queryByText('Form')).not.toBeInTheDocument();
  });
});
