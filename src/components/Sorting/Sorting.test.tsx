import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Sorting from './Sorting';
import { sortOptions } from '../../types/sort-options';

describe('Sorting', () => {
  const mockOnSortChange = vi.fn();
  const defaultOption = sortOptions[0];

  it('renders current sort option', () => {
    render(
      <Sorting
        currentSortOption={defaultOption}
        onSortChange={mockOnSortChange}
      />,
    );

    expect(screen.getAllByText(defaultOption).length).toBe(2);
  });

  it('opens and closes dropdown', async () => {
    render(
      <Sorting
        currentSortOption={defaultOption}
        onSortChange={mockOnSortChange}
      />,
    );

    await act(async () => {
      await userEvent.click(screen.getAllByText(defaultOption)[0]);
    });
    expect(screen.getByRole('list')).toHaveClass('places__options--opened');

    await act(async () => {
      await userEvent.click(screen.getByText(sortOptions[1]));
    });
    expect(screen.getByRole('list')).not.toHaveClass('places__options--opened');
  });

  it('should call onSortChange with selected option', async () => {
    render(
      <Sorting
        currentSortOption={defaultOption}
        onSortChange={mockOnSortChange}
      />,
    );
    const expectedOption = sortOptions[1];

    await act(async () => {
      await userEvent.click(screen.getAllByText(defaultOption)[0]);
    });
    await act(async () => {
      await userEvent.click(screen.getByText(expectedOption));
    });

    expect(mockOnSortChange).toHaveBeenCalledWith(expectedOption);
  });

  it('shows all available options', async () => {
    render(
      <Sorting
        currentSortOption={defaultOption}
        onSortChange={mockOnSortChange}
      />,
    );

    await act(async () => {
      await userEvent.click(screen.getAllByText(defaultOption)[0]);
    });

    expect(screen.getAllByRole('listitem')).toHaveLength(sortOptions.length);
  });
});
