import { StarOutlined } from '@ant-design/icons';
import { Button, Card, Divider, Flex, Statistic, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

import { pluralize } from '@/src/shared/utils/pluralize';

import styles from './styles.module.css';
import { HotelCardProps } from './types';

const imgStyle: React.CSSProperties = {
  display: 'block',
  objectFit: 'cover',
};

export const HotelCard = ({
  previewImageSrc,
  title,
  location,
  stars,
  rating,
  reviewsCount,
  pricePerDay,
  hotelId,
  services,
}: HotelCardProps) => {
  return (
    <Link href={`/hotel/${hotelId}`}>
      <Card
        hoverable
        className={styles['card']}
        styles={{ body: { padding: 0, overflow: 'hidden', height: '100%' } }}
      >
        <Flex gap="small" style={{ height: '100%' }} wrap="wrap">
          <div className={styles['image-container']}>
            <Image
              fill
              sizes="100%"
              alt=""
              src={previewImageSrc}
              style={imgStyle}
            />
          </div>
          <Flex vertical style={{ padding: '0.75rem', flexGrow: 1 }}>
            <Flex align="center">
              <Typography.Title
                level={3}
                style={{ margin: 0, marginRight: '0.75rem' }}
              >
                {title}
              </Typography.Title>
              <StarOutlined
                style={{ fontSize: '1rem', marginRight: '0.25rem' }}
              />
              {stars}
            </Flex>

            <Flex align="center" gap="middle">
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

            <Typography.Text>
              {location.city}, {location.address}
            </Typography.Text>
          </Flex>
          <Divider type="vertical" style={{ height: '100%' }} />
          <Flex
            vertical
            align="flex-end"
            justify="center"
            gap="middle"
            className={styles['book-container']}
          >
            <Typography.Text style={{ fontSize: '1.25rem' }}>
              {pricePerDay}₽ / ночь
            </Typography.Text>
            <Button size="large" type="primary">
              Забронировать
            </Button>
          </Flex>
        </Flex>
      </Card>
    </Link>
  );
};
