'use client';

import { List } from 'antd';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';

import { HotelsContext } from '@/src/app/store/hotels/hotels-provider';
import { HotelCard } from '@/src/entities/hotel-card';

export const HotelsList = observer(() => {
  const hotelsStore = useContext(HotelsContext);

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
      dataSource={hotelsStore?.getFilteredHotels()}
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
});
