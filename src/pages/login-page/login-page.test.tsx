import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import LoginPage from './login-page';
import { withHistory, withStore } from '../../test-utils/mock-components';
import { extractActionsTypes } from '../../test-utils/mocks';
import { fetchFavoritePlacesAction, loginUser } from '../../store/api-actions';

vi.mock('../../components/Logo/Logo', () => ({
  default: () => <div>Logo</div>,
}));

describe('LoginPage form input', () => {
  const mockHistory = createMemoryHistory();

  it('allows typing in email field', async () => {
    const componentWithHistory = withHistory(<LoginPage />, mockHistory);
    const { withStoreComponent } = withStore(componentWithHistory, {});

    render(withStoreComponent);

    await act(async () => {
      await userEvent.type(
        screen.getByPlaceholderText('Email'),
        'user@test.com',
      );
    });

    expect(screen.getByPlaceholderText('Email')).toHaveValue('user@test.com');
  });

  it('allows typing in password field', async () => {
    const componentWithHistory = withHistory(<LoginPage />, mockHistory);
    const { withStoreComponent } = withStore(componentWithHistory, {});

    render(withStoreComponent);

    await act(async () => {
      await userEvent.type(
        screen.getByPlaceholderText('Password'),
        'securePassword',
      );
    });

    expect(screen.getByPlaceholderText('Password')).toHaveValue(
      'securePassword',
    );
  });

  it('submits form with entered data', async () => {
    const componentWithHistory = withHistory(<LoginPage />, mockHistory);
    const { withStoreComponent, mockStore } = withStore(
      componentWithHistory,
      {},
    );

    render(withStoreComponent);

    await act(async () => {
      await userEvent.type(
        screen.getByPlaceholderText('Email'),
        'test@mail.com',
      );
      await userEvent.type(screen.getByPlaceholderText('Password'), '123456');

      await userEvent.click(screen.getByRole('button', { name: 'Sign in' }));
    });

    const actions = extractActionsTypes(mockStore.getActions());
    expect(actions).toEqual([
      loginUser.pending.type,
      fetchFavoritePlacesAction.pending.type,
      loginUser.fulfilled.type,
      fetchFavoritePlacesAction.fulfilled.type,
    ]);
  });
});
