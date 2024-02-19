import { HotelPage } from '@/src/_pages/hotel';

export default function Page({ params }: { params: { hotelId: string } }) {
  return <HotelPage hotelId={params.hotelId} />;
}
