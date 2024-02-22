'use client';

import withAuth from '@/src/shared/hocs/withAuth';
import { CreateReservationWidget } from '@/src/widgets/reservation';

import { ReservationPageProps } from './types';

export const ReservationPage = withAuth(({ hotelId }: ReservationPageProps) => {
  return <CreateReservationWidget hotelId={hotelId} />;
});
