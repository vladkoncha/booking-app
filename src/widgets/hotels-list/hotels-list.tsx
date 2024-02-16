'use client';

import { List } from 'antd';

import { HotelCard } from '@/src/entities/hotel-card';
import { HotelCardProps } from '@/src/entities/hotel-card/types';

import hotelImage from './assets/1.webp';

const hotelCard: HotelCardProps = {
  imageSrc: hotelImage.src,
  location: 'Москва',
  stars: 5,
  rating: 4.8,
  pricePerDay: 10000,
  hotelId: '1',
  reviewsCount: 123,
};

const data = Array.from({ length: 23 }).map((_, i) => ({
  ...hotelCard,
  hotelId: i.toString(),
}));

export const HotelsList = () => {
  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 5,
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item key={item.hotelId}>
          <HotelCard {...item} />
        </List.Item>
      )}
    />
  );
};
