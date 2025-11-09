import ReviewType from '../types/review-type';

const reviews: ReviewType[] = [
  {
    id: '1',
    dateTime: new Date('2024-03-15'),
    author: {
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: true,
    },
    text: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    rating: 4,
  },
  {
    id: '2',
    dateTime: new Date('2024-02-28'),
    author: {
      name: 'Emma',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: false,
    },
    text: 'An absolutely stunning location with charming architecture and peaceful atmosphere. Perfect for a romantic getaway or quiet retreat from the city hustle.',
    rating: 5,
  },
  {
    id: '3',
    dateTime: new Date('2024-03-10'),
    author: {
      name: 'Alex',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: true,
    },
    text: 'The combination of historical charm and modern amenities made our stay exceptional. The view of the river at sunset was simply breathtaking!',
    rating: 4,
  },
];

export default reviews;
