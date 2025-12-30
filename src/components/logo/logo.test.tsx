import { MemoryHistory, createMemoryHistory } from 'history';
import { withHistory } from '../../test-utils/mock-components';
import Logo from './logo';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AppRoute from '../../const/app-route';

describe('Logo', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render correctly', () => {
    const componentWithHistory = withHistory(<Logo />, mockHistory);

    render(componentWithHistory);

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveClass('header__logo-link');
    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
    expect(screen.getByAltText('6 cities logo')).toHaveClass('header__logo');
  });

  it('should redirect to "/" when click to link', async () => {
    const componentWithHistory = withHistory(<Logo />, mockHistory);
    const expectedRoute = AppRoute.Main;

    render(componentWithHistory);
    await act(async () => {
      await userEvent.click(screen.getByRole('link'));
    });

    expect(mockHistory.location.pathname).toEqual(expectedRoute);
  });
});
