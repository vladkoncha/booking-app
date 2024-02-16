import { Hotel } from '@/src/shared/models';

export type HotelCardProps = Pick<
  Hotel,
  | 'hotelId'
  | 'title'
  | 'location'
  | 'pricePerDay'
  | 'services'
  | 'stars'
  | 'rating'
> & {
  previewImageSrc: string;
  reviewsCount: number;
};
