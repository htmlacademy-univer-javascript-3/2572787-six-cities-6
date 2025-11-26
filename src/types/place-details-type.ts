import CityType from './city-type';
import LocationType from './location-type';
import HostType from './host-type';

type PlaceDetailsType = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: CityType;
  location: LocationType;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: string[];
  host: HostType;
  images: string[];
  maxAdults: number;
};

export default PlaceDetailsType;
