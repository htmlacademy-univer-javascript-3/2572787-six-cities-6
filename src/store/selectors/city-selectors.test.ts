import cities from '../../mocks/cities';
import { getCity } from './city-selectors';

describe('City selectors', () => {
  it('should return city from state', () => {
    const state = {
      city: {
        city: cities[1],
      },
    };

    const result = getCity(state);

    expect(result).toEqual(cities[1]);
  });
});
