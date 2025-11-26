import PlaceDetailsType from '../types/place-details-type';
import PlaceType from '../types/place-type';

export function toPlaceType(place: PlaceDetailsType): PlaceType {
  return {
    id: place.id,
    title: place.title,
    type: place.type,
    price: place.price,
    city: place.city,
    location: place.location,
    isFavorite: place.isFavorite,
    isPremium: place.isPremium,
    rating: place.rating,
    previewImage: place.images[0],
  };
}
