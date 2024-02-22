import { Metadata } from 'next';

import { ReservationPage } from '@/src/_pages/reservation';
import { HOTELS } from '@/src/shared/constants';

type Props = {
  params: { hotelId: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const hotel = HOTELS.find((hotel) => hotel.hotelId === params.hotelId);

  return {
    title: 'Забронировать ' + hotel?.title,
  };
}

export default function Page({ params }: Props) {
  return (
    <main>
      <ReservationPage hotelId={params.hotelId} />
    </main>
  );
}
