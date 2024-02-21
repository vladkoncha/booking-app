'use client';

import {
  App,
  Button,
  Checkbox,
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
import { isReservationConflicting } from './utils/is-reservation-conflicting';

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

const msInDay = 1000 * 60 * 60 * 24;

export const ReservationForm = ({
  reservationId,
  hotelId,
}: ReservationFormProps) => {
  const [form] = Form.useForm<FormModel>();
  const usersStore = useContext(UsersContext);
  const user = usersStore?.getCurrentUser();

  const hotelsStore = useContext(HotelsContext);
  const hotel = hotelsStore?.getHotelById(hotelId);

  const reservationsStore = useContext(ReservationsContext);
  const reservations = reservationsStore?.getReservationsByHotelId(hotelId);

  const { notification } = App.useApp();
  const router = useRouter();

  const servicesOptions = hotel?.services.map((service) => ({
    label: `${service.name} +${service.price}₽`,
    value: service.name,
    disabled: !service.price,
  }));
  const defaultServicesOptions = hotel?.services
    .filter((service) => !service.price)
    .map((service) => service.name);

  const datesValue = Form.useWatch('dates', form);
  const differenceMs =
    datesValue?.[1]['$d'].getTime() - datesValue?.[0]['$d'].getTime();
  const differenceDays = Math.ceil(differenceMs / msInDay);
  const servicesValue = Form.useWatch('services', form);

  const totalPrice =
    differenceDays * (hotel?.pricePerDay ?? 0) +
    servicesValue?.reduce(
      (acc, val) =>
        acc +
        differenceDays *
          (hotel?.services.find((service) => service.name === val)?.price ?? 0),
      0
    );

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
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

  const checkIfReservationConflicting = (
    checkinDate: Date,
    checkoutDate: Date
  ) => {
    const arrayOfRanges = reservations?.map((reservation) => [
      reservation.checkinDate,
      reservation.checkoutDate,
    ]);
    if (!arrayOfRanges) {
      return true;
    }

    for (let i = 0; i < arrayOfRanges.length; i++) {
      const [startDate, endDate] = arrayOfRanges[i];
      if (
        isReservationConflicting(checkinDate, checkoutDate, startDate, endDate)
      ) {
        return true;
      }
    }
    return false;
  };

  const handleSubmit = (values: FormModel) => {
    const resId = reservationId ?? reservationsStore?.getNextId();

    const checkinDate = values.dates[0]['$d'];
    const checkoutDate = values.dates[1]['$d'];

    if (checkIfReservationConflicting(checkinDate, checkoutDate)) {
      notification.error({
        message: 'Ошибка бронирования',
        description: 'Невозможно забронировать в эти даты',
      });
      return;
    }

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
      checkinDate,
      checkoutDate,
      services: values.services,
      guestsCount: values.guests,
      totalPrice,
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
        services: defaultServicesOptions,
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
          () => ({
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
        name="guests"
        label="Кол-во гостей"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, укажите количество гостей',
          },
          () => ({
            validator(_, value) {
              if (!value || (value >= 1 && value <= 4)) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('Количество гостей не должно превышать 4')
              );
            },
          }),
        ]}
      >
        <InputNumber min={1} />
      </Form.Item>

      <Form.Item name="services" label="Дополнительные услуги">
        <Checkbox.Group options={servicesOptions} />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Typography.Title level={3}>
          Итоговая сумма: {differenceDays ? `${totalPrice}₽` : ''}
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
