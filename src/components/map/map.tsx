import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import CityType from '../../types/city-type';
import useMap from '../../hocs/use-map';
import PlaceType from '../../types/place-type';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const/marker';

type MapProps = {
  city: CityType;
  block: 'cities' | 'offer';
  points: PlaceType[];
  selectedPoint?: PlaceType;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map({ city, block, points, selectedPoint }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    let isMounted = true;

    if (map && isMounted) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude,
        });

        marker
          .setIcon(
            selectedPoint !== null && point.id === selectedPoint?.id
              ? currentCustomIcon
              : defaultCustomIcon,
          )
          .addTo(markerLayer);
      });

      return () => {
        isMounted = false;
        map.removeLayer(markerLayer);
      };
    }

    return () => {
      isMounted = false;
    };
  }, [map, points, selectedPoint]);

  return <section className={`${block}__map map`} ref={mapRef} />;
}

export default Map;
