export interface HotelCardProps {
  hotelId: string;
  imageSrc: string;
  location: string;
  stars: 1 | 2 | 3 | 4 | 5;
  pricePerDay: number;
  rating: number;
  reviewsCount: number;
}
