import { createMemoryHistory, MemoryHistory } from 'history';
import { withHistory, withStore } from '../../test-utils/mock-components';
import Bookmark from './Bookmark';
import { act, render, screen } from '@testing-library/react';
import AuthorizationStatus from '../../const/authorization-status';
import userEvent from '@testing-library/user-event';
import AppRoute from '../../const/app-route';

describe('Bookmark', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render correctly when not checked', () => {
    const componentWithHistory = withHistory(
      <Bookmark
        block="offer"
        bookmarkSize={{ height: '100px', width: '100px' }}
      />,
      mockHistory,
    );
    const { withStoreComponent } = withStore(componentWithHistory, {
      auth: { authorizationStatus: AuthorizationStatus.NoAuth },
    });

    render(withStoreComponent);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).not.toHaveClass(
      'offer__bookmark-button--active',
    );
    expect(screen.getByRole('button')).toHaveClass('offer__bookmark-button');
    expect(screen.getByRole('button')).toHaveClass('button');

    expect(screen.getByText('To bookmarks')).toBeInTheDocument();
  });

  it('should render correctly when checked', () => {
    const componentWithHistory = withHistory(
      <Bookmark
        block="offer"
        bookmarkSize={{ height: '100px', width: '100px' }}
        inBookmarks
      />,
      mockHistory,
    );
    const { withStoreComponent } = withStore(componentWithHistory, {
      auth: { authorizationStatus: AuthorizationStatus.NoAuth },
    });

    render(withStoreComponent);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass(
      'offer__bookmark-button--active',
    );
    expect(screen.getByRole('button')).toHaveClass('offer__bookmark-button');
    expect(screen.getByRole('button')).toHaveClass('button');

    expect(screen.getByText('In bookmarks')).toBeInTheDocument();
  });

  it('should change checked state after click when authorized', async () => {
    const componentWithHistory = withHistory(
      <Bookmark
        block="offer"
        bookmarkSize={{ height: '100px', width: '100px' }}
        inBookmarks
      />,
      mockHistory,
    );
    const { withStoreComponent } = withStore(componentWithHistory, {
      auth: { authorizationStatus: AuthorizationStatus.Auth },
    });

    render(withStoreComponent);
    expect(screen.getByText('In bookmarks')).toBeInTheDocument();
    await act(async () => {
      await userEvent.click(screen.getByRole('button'));
    });

    expect(screen.queryByText('In bookmarks')).not.toBeInTheDocument();
    expect(screen.getByText('To bookmarks')).toBeInTheDocument();
  });

  it('should use callback after clicked when authorized', async () => {
    const mockCallback = vi.fn();
    const componentWithHistory = withHistory(
      <Bookmark
        block="offer"
        bookmarkSize={{ height: '100px', width: '100px' }}
        inBookmarks
        onBookmarkClick={mockCallback}
      />,
      mockHistory,
    );
    const { withStoreComponent } = withStore(componentWithHistory, {
      auth: { authorizationStatus: AuthorizationStatus.Auth },
    });

    render(withStoreComponent);
    await act(async () => {
      await userEvent.click(screen.getByRole('button'));
    });

    expect(mockCallback).toHaveBeenCalled();
    expect(mockCallback).toHaveBeenNthCalledWith(1, false);
  });

  it('should redirect to login after clicked when not authorized', async () => {
    const mockCallback = vi.fn();
    const componentWithHistory = withHistory(
      <Bookmark
        block="offer"
        bookmarkSize={{ height: '100px', width: '100px' }}
        inBookmarks
        onBookmarkClick={mockCallback}
      />,
      mockHistory,
    );
    const { withStoreComponent } = withStore(componentWithHistory, {
      auth: { authorizationStatus: AuthorizationStatus.NoAuth },
    });
    const expectedRoute = AppRoute.Login;

    render(withStoreComponent);
    await act(async () => {
      await userEvent.click(screen.getByRole('button'));
    });

    expect(mockHistory.location.pathname).toEqual(expectedRoute);
  });
});
