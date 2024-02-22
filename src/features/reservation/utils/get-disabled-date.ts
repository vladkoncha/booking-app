import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

import { Reservation } from '@/src/shared/models';

export const getDisabledDate =
  (reservations: Reservation[]) => (current: dayjs.Dayjs) => {
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
