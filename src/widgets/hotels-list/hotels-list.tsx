'use client';

import { List } from 'antd';

import { HotelCard } from '@/src/entities/hotel-card';

import { HOTELS } from './hotels-mock';

export const HotelsList = () => {
  return (
    <List
      style={{ marginBlockEnd: '3.5rem' }}
      itemLayout="vertical"
      size="large"
      pagination={{
        pageSize: 4,
        position: 'both',
        align: 'center',
      }}
      dataSource={HOTELS.concat(HOTELS).concat(HOTELS)}
      renderItem={(item) => (
        <List.Item key={item.hotelId}>
          <HotelCard
            {...item}
            previewImageSrc={item.images[0]}
            reviewsCount={item.reviews.length}
          />
        </List.Item>
      )}
    />
  );
};
