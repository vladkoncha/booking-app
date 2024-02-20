import { ReservationPage } from '@/src/_pages/reservation';

export default function Page({
  params,
  searchParams,
}: {
  params: { hotelId: string };
  searchParams: { [key: string]: number | undefined };
}) {
  return (
    <ReservationPage
      hotelId={params.hotelId}
      reservationId={searchParams.reservationId ?? null}
    />
  );
}
