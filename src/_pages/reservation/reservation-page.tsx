import { CreateReservationWidget } from '@/src/widgets/reservation';

import { ReservationPageProps } from './types';

export const ReservationPage = ({
  hotelId,
  reservationId,
}: ReservationPageProps) => {
  if (reservationId === null) {
    return <CreateReservationWidget hotelId={hotelId} reservationId={null} />;
  }

  return null;
};
