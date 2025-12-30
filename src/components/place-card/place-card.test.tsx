import { act, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import PlaceCard from './place-card';
import { withHistory, withStore } from '../../test-utils/mock-components';
import { extractActionsTypes, mockPlace } from '../../test-utils/mocks';
import AuthorizationStatus from '../../const/authorization-status';
import AppRoute from '../../const/app-route';
import userEvent from '@testing-library/user-event';
import {
  addPlaceToFavorites,
  removePlaceFromFavorites,
} from '../../store/api-actions';

describe('PlaceCard', () => {
  const mockPlaceData = mockPlace();
  const mockHistory = createMemoryHistory();

  it('render place information correctly', () => {
    const { withStoreComponent } = withStore(
      withHistory(
        <PlaceCard place={mockPlaceData} block="cities" imageSize="big" />,
        mockHistory,
      ),
      {
        auth: {
          authorizationStatus: AuthorizationStatus.Auth,
        },
      },
    );

    render(withStoreComponent);

    expect(screen.getByText(mockPlaceData.title)).toBeInTheDocument();
    expect(screen.getByText(mockPlaceData.type)).toBeInTheDocument();
    expect(screen.getByText(`€${mockPlaceData.price}`)).toBeInTheDocument();
  });

  it('has link to offer page', () => {
    const { withStoreComponent } = withStore(
      withHistory(
        <PlaceCard place={mockPlaceData} block="cities" imageSize="big" />,
        mockHistory,
      ),
      {
        auth: {
          authorizationStatus: AuthorizationStatus.Auth,
        },
      },
    );

    render(withStoreComponent);

    expect(screen.getAllByRole('link')[0]).toHaveAttribute(
      'href',
      `${AppRoute.Offer}/${mockPlaceData.id}`,
    );
  });

  it('calls onCardHover callback when provided', async () => {
    const mockOnCardHover = vi.fn();

    const { withStoreComponent } = withStore(
      withHistory(
        <PlaceCard
          place={mockPlaceData}
          block="cities"
          imageSize="big"
          onCardHover={mockOnCardHover}
        />,
        mockHistory,
      ),
      {
        auth: {
          authorizationStatus: AuthorizationStatus.Auth,
        },
      },
    );

    render(withStoreComponent);

    await userEvent.hover(screen.getByRole('article'));
    expect(mockOnCardHover).toHaveBeenCalledWith(mockPlaceData);

    await userEvent.unhover(screen.getByRole('article'));
    expect(mockOnCardHover).toHaveBeenCalledWith(undefined);
  });

  it('should dispatch "addPlaceToFavorites.pending" and "addPlaceToFavorites.fulfilled" on click bookmark on not favorite place', async () => {
    const { withStoreComponent, mockStore } = withStore(
      withHistory(
        <PlaceCard
          place={{ ...mockPlaceData, isFavorite: false }}
          block="cities"
          imageSize="big"
        />,
        mockHistory,
      ),
      {
        auth: {
          authorizationStatus: AuthorizationStatus.Auth,
        },
      },
    );

    render(withStoreComponent);

    await act(async () => {
      await userEvent.click(screen.getByRole('button'));
    });

    const actions = extractActionsTypes(mockStore.getActions());
    expect(actions).toEqual([
      addPlaceToFavorites.pending.type,
      addPlaceToFavorites.fulfilled.type,
    ]);
  });

  it('should dispatch "removePlaceFromFavorites.pending" and "removePlaceFromFavorites.fulfilled" on click bookmark on favorite place', async () => {
    const { withStoreComponent, mockStore } = withStore(
      withHistory(
        <PlaceCard
          place={{ ...mockPlaceData, isFavorite: true }}
          block="cities"
          imageSize="big"
        />,
        mockHistory,
      ),
      {
        auth: {
          authorizationStatus: AuthorizationStatus.Auth,
        },
      },
    );

    render(withStoreComponent);

    await act(async () => {
      await userEvent.click(screen.getByRole('button'));
    });

    const actions = extractActionsTypes(mockStore.getActions());
    expect(actions).toEqual([
      removePlaceFromFavorites.pending.type,
      removePlaceFromFavorites.fulfilled.type,
    ]);
  });
});
