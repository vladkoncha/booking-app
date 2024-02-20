'use client';

import {
  App,
  Button,
  DatePicker,
  Form,
  GetProps,
  InputNumber,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

import { HotelsContext } from '@/src/app/store/hotels/hotels-provider';
import { ReservationsContext } from '@/src/app/store/reservations/reservations-provider';
import { UsersContext } from '@/src/app/store/users/users-provider';
import { Reservation } from '@/src/shared/models';

import { FormModel, ReservationFormProps } from './types';

const { RangePicker } = DatePicker;
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;
dayjs.extend(customParseFormat);

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export const ReservationForm = ({
  reservationId,
  hotelId,
}: ReservationFormProps) => {
  const [form] = Form.useForm<FormModel>();
  const datesValue = Form.useWatch('dates', form);
  const differenceMs =
    datesValue?.[1]['$d'].getTime() - datesValue?.[0]['$d'].getTime();
  const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

  const usersStore = useContext(UsersContext);
  const user = usersStore?.getCurrentUser();

  const hotelsStore = useContext(HotelsContext);
  const hotel = hotelsStore?.getHotelById(hotelId);

  const { notification } = App.useApp();
  const router = useRouter();

  const reservationsStore = useContext(ReservationsContext);

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    const reservations = reservationsStore?.getReservationsByHotelId(hotelId);
    const arrayOfRanges = reservations?.map((reservation) => [
      reservation.checkinDate,
      reservation.checkoutDate,
    ]);

    if (!arrayOfRanges) {
      return current && current < dayjs().startOf('day');
    }

    for (let i = 0; i < arrayOfRanges.length; i++) {
      const [startDate, endDate] = arrayOfRanges[i];
      const rangeStartDate = dayjs(startDate);
      const rangeEndDate = dayjs(endDate);

      if (
        (current.isSame(rangeStartDate, 'day') ||
          current.isAfter(rangeStartDate, 'day')) &&
        (current.isSame(rangeEndDate, 'day') ||
          current.isBefore(rangeEndDate, 'day'))
      ) {
        return true;
      }
    }
    return current && current < dayjs().startOf('day');
  };

  const handleSubmit = (values: FormModel) => {
    console.log(user);

    const resId = reservationId ?? reservationsStore?.getNextId();

    if (!resId) {
      notification.error({
        message: 'Ошибка бронирования',
        description: '',
      });
      return;
    }

    if (!user?.email) {
      notification.error({
        message: 'Ошибка бронирования',
        description: 'Пользователь не авторизован',
      });
      return;
    }

    const reservation: Reservation = {
      reservationId: resId,
      email: user.email,
      hotelId,
      checkinDate: values.dates[0]['$d'],
      checkoutDate: values.dates[1]['$d'],
      services: [],
      guestsCount: values.guests,
    };

    reservationsStore?.setReservation(reservation.reservationId, reservation);

    notification?.success({
      message: 'Вы успешно забронировали комнату',
      description: 'Переходим на страницу отеля',
    });

    router.push(`/hotel/${hotelId}`);
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      scrollToFirstError
      name="reservation"
      onFinish={handleSubmit}
      initialValues={{
        guests: 1,
      }}
      style={{ maxWidth: 700 }}
    >
      <Form.Item
        name="dates"
        label="Даты"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, выберите даты бронирования',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (
                !value ||
                value[0]['$d'].getTime() !== value[1]['$d'].getTime()
              ) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Выберите как минимум 1 ночь'));
            },
          }),
        ]}
      >
        <RangePicker disabledDate={disabledDate} />
      </Form.Item>

      <Form.Item
        hasFeedback
        name="guests"
        label="Кол-во гостей"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, укажите количеств гостей',
          },
        ]}
      >
        <InputNumber min={1} max={4} />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Typography.Title level={3}>
          Итоговая сумма:{' '}
          {differenceDays
            ? `${differenceDays * (hotel?.pricePerDay ?? 0)}₽`
            : ''}
        </Typography.Title>
        <Button
          style={{ width: '100%' }}
          size="large"
          type="primary"
          htmlType="submit"
        >
          Забронировать
        </Button>
      </Form.Item>
    </Form>
  );
};
