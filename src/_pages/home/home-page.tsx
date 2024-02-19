import { HotelsFilter } from '@/src/widgets/hotels-filter/hotels-filter';
import { HotelsList } from '@/src/widgets/hotels-list';

export const HomePage = () => {
  return (
    <>
      <HotelsFilter />
      <HotelsList />
    </>
  );
};
