import { renderHook } from '@testing-library/react';
import { useRef } from 'react';
import useMap from './use-map';
import { Map, TileLayer } from 'leaflet';
import cities from '../mocks/cities';

vi.mock('leaflet', () => {
  const mockMap = {
    addLayer: vi.fn(),
    setView: vi.fn(),
  };

  const mockTileLayer = vi.fn();

  return {
    Map: vi.fn(() => mockMap),
    TileLayer: vi.fn(() => mockTileLayer),
  };
});

describe('useMap', () => {
  const mockCity = cities[0];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return null when mapRef is null', () => {
    const { result } = renderHook(() => {
      const mapRef = useRef<HTMLElement | null>(null);
      return useMap(mapRef, mockCity);
    });

    expect(result.current).toBeNull();
    expect(Map).not.toHaveBeenCalled();
  });

  it('should create map instance when mapRef has element', () => {
    const mockElement = document.createElement('div');

    const { result } = renderHook(() => {
      const mapRef = useRef<HTMLElement | null>(mockElement);
      return useMap(mapRef, mockCity);
    });

    expect(Map).toHaveBeenCalledTimes(1);
    expect(Map).toHaveBeenCalledWith(mockElement, {
      center: {
        lat: mockCity.location.latitude,
        lng: mockCity.location.longitude,
      },
      zoom: 13,
    });

    expect(TileLayer).toHaveBeenCalledTimes(1);
    expect(TileLayer).toHaveBeenCalledWith(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      },
    );

    expect(result.current).toBeTruthy();
  });

  it('should create map only once when component re-renders', () => {
    const mockElement = document.createElement('div');

    const { result, rerender } = renderHook(
      ({ city }) => {
        const mapRef = useRef<HTMLElement | null>(mockElement);
        return useMap(mapRef, city);
      },
      { initialProps: { city: mockCity } },
    );

    expect(Map).toHaveBeenCalledTimes(1);

    rerender({ city: mockCity });

    expect(Map).toHaveBeenCalledTimes(1);
    expect(result.current).toBeTruthy();
  });

  it('should handle different city locations correctly', () => {
    const mockElement = document.createElement('div');
    cities.forEach((city) => {
      vi.clearAllMocks();

      renderHook(() => {
        const mapRef = useRef<HTMLElement | null>(mockElement);
        return useMap(mapRef, city);
      });

      expect(Map).toHaveBeenCalledWith(
        mockElement,
        expect.objectContaining({
          center: {
            lat: city.location.latitude,
            lng: city.location.longitude,
          },
        }),
      );
    });
  });
});
