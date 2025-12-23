import { renderHook, act } from '@testing-library/react';
import useHoveredPlace from './use-hovered-place';
import { mockPlace } from '../test-utils/mocks';

describe('Use hovered place hook', () => {
  const testPlace = mockPlace();
  const testPlace2 = mockPlace();

  describe('init', () => {
    it('init undefined without default value', () => {
      const { result } = renderHook(() => useHoveredPlace());
      expect(result.current[0]).toBeUndefined();
    });

    it('init with default value', () => {
      const { result } = renderHook(() => useHoveredPlace(testPlace));
      expect(result.current[0]).toBe(testPlace);
    });
  });

  describe('change state', () => {
    it('set place on hover', () => {
      const { result } = renderHook(() => useHoveredPlace());

      act(() => {
        result.current[1](testPlace);
      });

      expect(result.current[0]).toBe(testPlace);
    });

    it('set default on unhover with default value', () => {
      const { result } = renderHook(() => useHoveredPlace(testPlace));

      act(() => {
        result.current[1](testPlace2);
        result.current[1](undefined);
      });

      expect(result.current[0]).toBe(testPlace);
    });

    it('set undefined on unhover without default value', () => {
      const { result } = renderHook(() => useHoveredPlace());

      act(() => {
        result.current[1](testPlace);
        result.current[1](undefined);
      });

      expect(result.current[0]).toBeUndefined();
    });
  });

  describe('multiply changes', () => {
    it('correctly change state', () => {
      const { result } = renderHook(() => useHoveredPlace());

      act(() => {
        result.current[1](testPlace);
      });
      expect(result.current[0]).toBe(testPlace);

      act(() => {
        result.current[1](testPlace2);
      });
      expect(result.current[0]).toBe(testPlace2);

      act(() => {
        result.current[1](testPlace);
      });
      expect(result.current[0]).toBe(testPlace);
    });
  });
});
