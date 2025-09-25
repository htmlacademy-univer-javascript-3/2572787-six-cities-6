import PlaceType from '../../types/place-type';

const places: PlaceType[] = [
  {
    name: 'Beautiful &amp; luxurious apartment at great location',
    type: 'Apartment',
    imageUrl: 'img/apartment-01.jpg',
    price: 120,
    rating: 4,
    isPremium: true,
    inBookmarks: false
  },
  {
    name: 'Wood and stone place',
    type: 'Room',
    imageUrl: 'img/room.jpg',
    price: 80,
    rating: 4,
    isPremium: false,
    inBookmarks: true
  },
  {
    name: 'Canal View Prinsengracht',
    type: 'Apartment',
    imageUrl: 'img/apartment-02.jpg',
    price: 132,
    rating: 4,
    isPremium: false,
    inBookmarks: false
  },
  {
    name: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    imageUrl: 'img/apartment-03.jpg',
    price: 180,
    rating: 5,
    isPremium: true,
    inBookmarks: false
  }
];

export default places;
