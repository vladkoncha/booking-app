import { makeAutoObservable } from 'mobx';

import { HOTELS } from '@/src/shared/constants';
import { Hotel, HotelFilters } from '@/src/shared/models';

export default class HotelsStore {
  private filters: HotelFilters = {
    city: 'Все',
    stars: 'Все',
    minPrice: 0,
    maxPrice: 500000,
  };
  private hotels: Hotel[] = HOTELS;

  constructor() {
    makeAutoObservable(this);
  }

  getFilteredHotels() {
    return this.hotels.filter(
      (hotel) =>
        (this.filters.city === 'Все' ||
          hotel.location.city === this.filters.city) &&
        (this.filters.stars === 'Все' || hotel.stars === this.filters.stars) &&
        hotel.pricePerDay >= this.filters.minPrice &&
        hotel.pricePerDay <= this.filters.maxPrice
    );
  }

  setFilters(newFilters: HotelFilters) {
    this.filters = newFilters;
  }

  getFilters() {
    return this.filters;
  }

  getHotelById(hotelId: string) {
    return this.hotels.find((hotel) => hotel.hotelId === hotelId);
  }
}
