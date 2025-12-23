import { render, screen } from '@testing-library/react';
import EmptyCities from './EmptyCities';
import cities from '../../mocks/cities';

describe('EmptyCities', () => {
  const mockCity = cities[0];

  it('renders empty state message', () => {
    render(<EmptyCities city={mockCity} />);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
  });

  it('shows city name in message', () => {
    const expectedText = `We could not find any property available at the moment in ${mockCity.name}`;

    render(<EmptyCities city={mockCity} />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
