import { useEffect, useState, MutableRefObject, useRef } from 'react';
import { Map, TileLayer } from 'leaflet';
import CityType from '../types/city-type';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: CityType,
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      );

      instance.addLayer(layer);

      if (isMounted) {
        setMap(instance);
        isRenderedRef.current = true;
      } else {
        instance.remove();
      }
    }

    return () => {
      isMounted = false;
    };
  }, [mapRef, map, city]);

  useEffect(() => {
    let isMounted = true;

    if (map && isMounted) {
      map.setView(
        {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        city.location.zoom,
      );
    }

    return () => {
      isMounted = false;
    };
  }, [map, city]);

  return map;
}

export default useMap;
