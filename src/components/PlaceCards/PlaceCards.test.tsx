import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import PlaceCards from './PlaceCards';
import { withHistory, withStore } from '../../test-utils.ts/mock-components';
import { mockPlace } from '../../test-utils.ts/mocks';
import PlaceType from '../../types/place-type';
import AuthorizationStatus from '../../const/authorization-status';

describe('PlaceCards', () => {
  const mockHistory = createMemoryHistory();
  const mockPlaces: PlaceType[] = [
    { ...mockPlace(), id: '1' },
    { ...mockPlace(), id: '2' },
  ];

  it('renders multiple place cards', () => {
    const { withStoreComponent } = withStore(
      withHistory(
        <PlaceCards places={mockPlaces} block="cities" cardImageSize="big" />,
        mockHistory,
      ),
      {
        auth: {
          authorizationStatus: AuthorizationStatus.Auth,
        },
      },
    );

    render(withStoreComponent);

    expect(screen.getAllByRole('article')).toHaveLength(2);
  });
});
