import city, { changeCity } from './city';
import cities from '../../mocks/cities';

describe('City Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      city: cities[1],
    };

    const result = city(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      city: cities[0],
    };

    const result = city(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should change city with "changeCity" action', () => {
    const initialState = {
      city: cities[0],
    };
    const expectedState = {
      city: cities[1],
    };

    const result = city(initialState, changeCity({ city: cities[1].name }));

    expect(result).toEqual(expectedState);
  });
});
