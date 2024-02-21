import { makeAutoObservable } from 'mobx';

import { Hotel, Reservation, User } from '@/src/shared/models';

export default class ReservationsStore {
  private reservations = new Map<Reservation['reservationId'], Reservation>();
  private nextId = 1;

  constructor() {
    makeAutoObservable(this);
  }

  getReservationsByHotelId(hotelId: Hotel['hotelId']) {
    return [...this.reservations.values()].filter(
      (reservation) => hotelId === reservation.hotelId
    );
  }

  getReservationByReservationId(reservationId: Reservation['reservationId']) {
    return this.reservations.get(reservationId);
  }

  setReservation(
    reservationId: Reservation['reservationId'],
    reservation: Reservation
  ) {
    this.reservations.set(reservationId, reservation);
  }

  getReservationsByUserEmail(email: User['email']) {
    return [...this.reservations.values()].filter(
      (reservation) => email === reservation.email
    );
  }

  getNextId() {
    return this.nextId++;
  }

  deleteReservation(reservationId: Reservation['reservationId']) {
    this.reservations.delete(reservationId);
  }
}
