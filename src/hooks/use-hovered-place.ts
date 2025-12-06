import { useCallback, useState } from 'react';
import PlaceType from '../types/place-type';

function useHoveredPlace(
  defaultPlace: PlaceType | undefined = undefined,
): [PlaceType | undefined, (hovered: PlaceType | undefined) => void] {
  const [hoveredPlace, setHoveredPlace] = useState<PlaceType | undefined>(
    defaultPlace,
  );

  const handleHover = useCallback(
    (hovered: PlaceType | undefined) => {
      if (hovered) {
        setHoveredPlace(hovered);
        return;
      }

      setHoveredPlace(defaultPlace);
    },
    [setHoveredPlace, defaultPlace],
  );

  return [hoveredPlace, handleHover];
}

export default useHoveredPlace;
