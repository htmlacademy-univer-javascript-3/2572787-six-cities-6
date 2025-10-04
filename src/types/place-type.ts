import PlaceDetailsType from './place-details-type';

type PlaceType = PlaceDetailsType & {
  id: string;
  title: string;
  type: string;
  images: string[];
  price: number;
  rating: number;
  isPremium: boolean;
  isFavorite: boolean;
}

export default PlaceType;
