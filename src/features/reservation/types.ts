import { Hotel, Reservation, Service } from '@/src/shared/models';

export interface ReservationFormProps {
  hotelId: Hotel['hotelId'];
  reservationId: Reservation['reservationId'] | null;
}

interface RangeDate {
  $d: Date;
}

export interface FormModel {
  dates: [RangeDate, RangeDate];
  guests: number;
  services: Service['name'][];
}
