export const sortOptions = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
] as const;

export type SortOption = (typeof sortOptions)[number];
