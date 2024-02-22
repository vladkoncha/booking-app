'use client';

import { DeleteOutlined, StarOutlined } from '@ant-design/icons';
import { Button, List, Popconfirm, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useContext } from 'react';

import { HotelsContext } from '@/src/app/store/hotels/hotels-provider';
import { ReservationsContext } from '@/src/app/store/reservations/reservations-provider';
import { UsersContext } from '@/src/app/store/users/users-provider';
import { pluralize } from '@/src/shared/utils/pluralize';

export const HistoryList = observer(() => {
  const reservationsStore = useContext(ReservationsContext);
  const usersStore = useContext(UsersContext);
  const hotelsStore = useContext(HotelsContext);

  const list = reservationsStore?.getReservationsByUserEmail(
    usersStore?.getCurrentUser()?.email ?? ''
  );

  return (
    <List
      bordered
      style={{ margin: '1rem' }}
      itemLayout="horizontal"
      size="large"
      pagination={{
        pageSize: 4,
        position: 'bottom',
        align: 'center',
      }}
      header={
        <Typography.Title level={3}>История бронирования</Typography.Title>
      }
      dataSource={list}
      renderItem={(reservation) => {
        const hotel = hotelsStore?.getHotelById(reservation.hotelId);
        const description = `${reservation.checkinDate.toLocaleDateString('ru-RU')} - ${reservation.checkoutDate.toLocaleDateString('ru-RU')}
Услуги: ${reservation.services.join(', ')}
${pluralize(reservation.guestsCount, ['гость', 'гостя', 'гостей'])}`;

        return (
          <List.Item
            actions={[
              <Popconfirm
                key="delete-button"
                title="Отменить бронирование?"
                onConfirm={() =>
                  reservationsStore?.deleteReservation(
                    reservation.reservationId
                  )
                }
                okText="Да"
                placement="leftBottom"
              >
                <Button
                  danger
                  type="default"
                  shape="circle"
                  icon={<DeleteOutlined />}
                />
              </Popconfirm>,
            ]}
          >
            <List.Item.Meta
              title={
                <Link href={`/hotel/${reservation.hotelId}`}>
                  {hotel?.title} {hotel?.stars} {<StarOutlined />}
                </Link>
              }
              description={description}
              style={{ whiteSpace: 'pre-wrap' }}
            />
            <Typography.Text strong>{reservation.totalPrice}₽</Typography.Text>
          </List.Item>
        );
      }}
    />
  );
});
