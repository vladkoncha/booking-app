import { HotelDetails } from '@/src/widgets/hotel-details';

import { HotelPageProps } from './types';

export const HotelPage = ({ hotelId }: HotelPageProps) => {
  return <HotelDetails hotelId={hotelId} />;
};
