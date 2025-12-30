import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import MainPage from './main-page';
import { withHistory, withStore } from '../../test-utils/mock-components';
import cities from '../../mocks/cities';
import { extractActionsTypes, mockPlace } from '../../test-utils/mocks';
import { changeCity } from '../../store/slices/city';

vi.mock('../../components/Header/Header', () => ({
  default: () => <header>Header</header>,
}));
vi.mock('../../components/Cities/Cities', () => ({
  default: () => <div>Cities</div>,
}));
vi.mock('../../components/EmptyCities/EmptyCities', () => ({
  default: () => <div>EmptyCities</div>,
}));

describe('MainPage', () => {
  const mockHistory = createMemoryHistory();

  it('render city tabs', () => {
    const componentWithHistory = withHistory(<MainPage />, mockHistory);
    const { withStoreComponent } = withStore(componentWithHistory, {
      city: {
        city: cities[0],
      },
      places: {
        places: [mockPlace(), mockPlace(), mockPlace()],
      },
    });

    render(withStoreComponent);

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
  });

  it('changes city on tab click', async () => {
    const componentWithHistory = withHistory(<MainPage />, mockHistory);
    const { withStoreComponent, mockStore } = withStore(componentWithHistory, {
      city: {
        city: cities[0],
      },
      places: {
        places: [mockPlace(), mockPlace(), mockPlace()],
      },
    });
    const expectedCity = 'Amsterdam';

    render(withStoreComponent);

    await act(async () => {
      await userEvent.click(screen.getByText(expectedCity));
    });

    const actions = extractActionsTypes(mockStore.getActions());
    const changeCityAction = mockStore.getActions()[0] as ReturnType<
      typeof changeCity
    >;
    expect(actions).toEqual([changeCity.type]);
    expect(changeCityAction.payload).toEqual({ city: expectedCity });
  });
});
