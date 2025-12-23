import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner', () => {
  it('should render correctly', () => {
    const expectedText = /Loading/i;

    render(<Spinner />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
