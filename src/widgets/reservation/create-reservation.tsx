'use client';

import { Flex, Typography } from 'antd';
import { useContext } from 'react';

import { HotelsContext } from '@/src/app/store/hotels/hotels-provider';
import { ReservationForm } from '@/src/features/reservation';

import { CreateReservationWidgetProps } from './types';

const { Title } = Typography;

export const CreateReservationWidget = ({
  hotelId,
  reservationId,
}: CreateReservationWidgetProps) => {
  const hotelsStore = useContext(HotelsContext);

  const hotel = hotelsStore?.getHotelById(hotelId);

  return (
    <Flex vertical gap="middle" align="center">
      <Flex vertical style={{ marginBlockStart: '3rem', padding: '2rem' }}>
        <Title>{hotel?.title}</Title>
        <ReservationForm hotelId={hotelId} reservationId={reservationId} />
      </Flex>
    </Flex>
  );
};
