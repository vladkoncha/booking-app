import { Hotel, Services } from './hotel';
import { User } from './user';

export interface Reservation {
  reservationId: number;
  email: User['email'];
  hotelId: Hotel['hotelId'];
  checkinDate: Date;
  checkoutDate: Date;
  services: Services[];
  guestsCount: number;
}
