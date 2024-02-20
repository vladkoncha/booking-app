import { Hotel, Reservation } from '@/src/shared/models';

export interface CreateReservationWidgetProps {
  hotelId: Hotel['hotelId'];
  reservationId: Reservation['reservationId'] | null;
}
