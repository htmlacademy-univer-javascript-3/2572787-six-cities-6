import PlaceType from '../types/place-type';
import { SortOption } from '../types/sort-options';

export function sortPlaces(
  places: PlaceType[],
  sortOption: SortOption,
): PlaceType[] {
  const sortedPlaces = [...places];

  switch (sortOption) {
    case 'Price: low to high':
      return sortedPlaces.sort((a, b) => a.price - b.price);

    case 'Price: high to low':
      return sortedPlaces.sort((a, b) => b.price - a.price);

    case 'Top rated first':
      return sortedPlaces.sort((a, b) => b.rating - a.rating);

    case 'Popular':
    default:
      return sortedPlaces;
  }
}
