import { HotelPage } from '@/src/_pages/hotel';

export default function Page({ params }: { params: { hotelId: string } }) {
  return (
    <main>
      <HotelPage hotelId={params.hotelId} />
    </main>
  );
}
