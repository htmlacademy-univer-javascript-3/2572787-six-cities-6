type ReviewType = {
  id: string;
  dateTime: Date;
  author: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  text: string;
  rating: number;
};

export default ReviewType;
