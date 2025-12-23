import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import NotFoundPage from './NotFoundPage';
import { withHistory, withStore } from '../../test-utils/mock-components';

vi.mock('../../components/Header/Header', () => ({
  default: () => <header>Header</header>,
}));

describe('NotFoundPage', () => {
  const mockHistory = createMemoryHistory();

  it('render 404 message', () => {
    const componentWithHistory = withHistory(<NotFoundPage />, mockHistory);
    const { withStoreComponent } = withStore(componentWithHistory, {});

    render(withStoreComponent);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
  });

  it('has link to home page', () => {
    const componentWithHistory = withHistory(<NotFoundPage />, mockHistory);
    const { withStoreComponent } = withStore(componentWithHistory, {});

    render(withStoreComponent);

    const link = screen.getByText('Вернуться на главную');
    expect(link).toHaveAttribute('href', '/');
  });
});
