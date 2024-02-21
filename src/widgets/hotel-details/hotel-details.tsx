'use client';

import { StarOutlined } from '@ant-design/icons';
import {
  Button,
  Carousel,
  Flex,
  Image,
  List,
  Statistic,
  Typography,
} from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

import { HotelsContext } from '@/src/app/store/hotels/hotels-provider';
import { pluralize } from '@/src/shared/utils/pluralize';

import styles from './styles.module.css';
import { HotelDetailsProps } from './types';

export const HotelDetails = ({ hotelId }: HotelDetailsProps) => {
  const router = useRouter();
  const hotelsStore = useContext(HotelsContext);

  const hotel = hotelsStore?.getHotelById(hotelId);

  if (!hotel) {
    router.push('/404');
    return;
  }

  const {
    title,
    description,
    images,
    location,
    stars,
    pricePerDay,
    rating,
    reviews,
    services,
  } = hotel;

  const reviewsCount = reviews.length;

  return (
    <>
      <Flex gap="small" wrap="wrap" className={styles['main-container']}>
        <Flex wrap="wrap" justify="space-between" style={{ width: '100%' }}>
          <Flex vertical>
            <Typography.Title
              level={2}
              style={{ margin: 0, marginBottom: '0.75rem' }}
            >
              {title}
              <StarOutlined
                style={{
                  fontSize: '75%',
                  marginLeft: '1rem',
                  marginRight: '0.25rem',
                }}
              />
              {stars}
            </Typography.Title>

            <Flex gap={8} wrap="wrap">
              <Flex gap={8}>
                <Statistic
                  value={rating}
                  precision={1}
                  valueStyle={{
                    color: rating > 3 ? '#3f8600' : '#cf1322',
                    fontSize: '0.9rem',
                  }}
                />
                <Typography.Text style={{ fontSize: '0.9rem' }}>
                  {pluralize(reviewsCount, ['отзыв', 'отзыва', 'отзывов'])}
                </Typography.Text>
              </Flex>

              <Typography.Text style={{ marginBottom: '1rem' }}>
                {location.city}, {location.address}
              </Typography.Text>
            </Flex>
          </Flex>

          <Flex
            vertical
            gap={8}
            justify="center"
            style={{ minWidth: '14rem' }}
            className={styles['book-container']}
          >
            <Typography.Text
              style={{ fontSize: '1.25rem', textAlign: 'center' }}
            >
              {pricePerDay}₽ / ночь
            </Typography.Text>

            <Link href={`/book/${hotelId}`}>
              <Button
                block
                aria-hidden
                tabIndex={-1}
                size="large"
                type="primary"
              >
                Забронировать
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Flex>

      <Flex className={styles['main-container']} gap="middle" wrap="wrap">
        <div style={{ width: '100%', maxWidth: '40rem' }}>
          <Carousel dotPosition="top" className={styles['carousel']}>
            {images.map((imageSrc) => (
              <div key={imageSrc} className={styles['image-container']}>
                <Image
                  preview={false}
                  src={imageSrc}
                  alt=""
                  style={{
                    width: '100%',
                    display: 'block',
                    objectFit: 'cover',
                  }}
                />
              </div>
            ))}
          </Carousel>
        </div>

        <Flex vertical style={{ flex: 1 }}>
          <Typography.Title level={3}>Про отель</Typography.Title>
          <Typography.Text
            style={{ maxWidth: '50rem', whiteSpace: 'pre-wrap' }}
          >
            {description}
          </Typography.Text>
        </Flex>
      </Flex>

      <Flex vertical className={styles['main-container']}>
        <List
          pagination={{
            pageSize: 3,
            position: 'bottom',
            align: 'center',
          }}
          bordered
          header={<Typography.Title level={3}>Отзывы</Typography.Title>}
          dataSource={reviews}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </Flex>
    </>
  );
};
