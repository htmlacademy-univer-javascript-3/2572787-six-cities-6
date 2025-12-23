import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import Map from './Map';
import cities from '../../mocks/cities';
import { mockPlace } from '../../test-utils/mocks';
import { withHistory, withStore } from '../../test-utils/mock-components';

describe('Map', () => {
  const mockHistory = createMemoryHistory();
  const mockCityData = cities[0];
  const mockPoints = [mockPlace()];

  it('render map container', () => {
    const componentWithHistory = withHistory(
      <Map city={mockCityData} block="cities" points={mockPoints} />,
      mockHistory,
    );
    const { withStoreComponent } = withStore(componentWithHistory, {});

    const { container} = render(withStoreComponent);

    expect(container.querySelector('section')).toBeInTheDocument();
    expect(container.querySelector('section')).toHaveClass('cities__map');
    expect(container.querySelector('section')).toHaveClass('map');
  });
});
