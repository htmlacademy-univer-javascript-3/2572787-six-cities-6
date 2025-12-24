import { act, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from './HistoryRouter';

describe('HistoryRouter', () => {
  it('should render children inside Router', () => {
    const history = createMemoryHistory();
    const testText = 'Test Child Component';

    render(
      <HistoryRouter history={history}>
        <div>{testText}</div>
      </HistoryRouter>,
    );

    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  it('should update when history changes', () => {
    const history = createMemoryHistory();
    const initialPath = '/initial';
    const newPath = '/new-path';

    history.push(initialPath);

    const TestComponent = () => (
      <HistoryRouter history={history}>
        <div data-testid="location">{history.location.pathname}</div>
      </HistoryRouter>
    );

    const { rerender } = render(<TestComponent />);

    expect(screen.getByTestId('location')).toHaveTextContent(initialPath);

    act(() => {
      history.push(newPath);
    });

    rerender(<TestComponent />);

    expect(screen.getByTestId('location')).toHaveTextContent(newPath);
  });

  it('should subscribe to history changes', () => {
    const history = createMemoryHistory();
    const listenSpy = vi.spyOn(history, 'listen');

    render(
      <HistoryRouter history={history}>
        <div>Test</div>
      </HistoryRouter>,
    );

    expect(listenSpy).toHaveBeenCalledTimes(1);
    expect(listenSpy).toHaveBeenCalledWith(expect.any(Function));

    listenSpy.mockRestore();
  });
});
