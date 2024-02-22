import { Metadata } from 'next';

import { HotelPage } from '@/src/_pages/hotel';
import { HOTELS } from '@/src/shared/constants';

type Props = {
  params: { hotelId: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const hotel = HOTELS.find((hotel) => hotel.hotelId === params.hotelId);

  return {
    title: hotel?.title,
  };
}

export default function Page({ params }: { params: { hotelId: string } }) {
  return (
    <main>
      <HotelPage hotelId={params.hotelId} />
    </main>
  );
}
