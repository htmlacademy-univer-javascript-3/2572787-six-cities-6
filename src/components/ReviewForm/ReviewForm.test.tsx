import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReviewForm from './ReviewForm';
import { withStore } from '../../test-utils/mock-components';
import { lorem } from 'faker';
import { sendReview } from '../../store/api-actions';
import {
  extractActionsTypes,
  mockPlaceDetails,
  mockReview,
} from '../../test-utils/mocks';
import ApiRoute from '../../const/api-route';

describe('ReviewForm', () => {
  it('renders form fields', () => {
    const { withStoreComponent } = withStore(<ReviewForm />, {});
    const reviewLabel = 'Your review';
    const textareaPlaceholder = /Tell how was your stay/i;
    const submitButtonText = 'Submit';

    render(withStoreComponent);

    expect(screen.getByLabelText(reviewLabel)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(textareaPlaceholder),
    ).toBeInTheDocument();
    expect(screen.getByText(submitButtonText)).toBeInTheDocument();
  });

  it('disables button when review is short', async () => {
    const { withStoreComponent } = withStore(<ReviewForm />, {});

    render(withStoreComponent);

    await act(async () => {
      await userEvent.click(screen.getAllByRole('radio')[3]);
      await userEvent.type(screen.getByRole('textbox'), 'Short');
    });

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('dispatch "sendReview" on submit', async () => {
    const mockSelectedPlace = {
      detailedInfo: mockPlaceDetails(),
      nearPlaces: [],
      reviews: [],
    };
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
      <ReviewForm />,
      {
        selectedPlace: {
          selectedPlace: mockSelectedPlace,
          isLoading: false,
          isNotFound: false,
        },
      },
    );
    mockAxiosAdapter
      .onPost(`${ApiRoute.Reviews}/${mockSelectedPlace.detailedInfo.id}`)
      .reply(200, mockReview());
    render(withStoreComponent);

    await act(async () => {
      await userEvent.click(screen.getAllByRole('radio')[3]);
      await userEvent.type(screen.getByRole('textbox'), lorem.paragraph());
    });

    await act(async () => {
      await userEvent.click(screen.getByRole('button'));
    });

    const actions = extractActionsTypes(mockStore.getActions());
    expect(actions).toEqual([
      sendReview.pending.type,
      sendReview.fulfilled.type,
    ]);
  });
});
