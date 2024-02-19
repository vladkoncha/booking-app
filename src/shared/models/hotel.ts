import { CITIES } from '../constants';

export enum Services {
  Wifi = 'Wifi',
  Parking = 'Parking',
  Gym = 'Gym',
  AirConditioner = 'AirConditioner',
  Breakfast = 'Breakfast',
  Pool = 'Pool',
}

export interface Hotel {
  hotelId: string;
  title: string;
  description: string;
  images: string[];
  location: {
    city: (typeof CITIES)[number];
    address: string;
  };
  stars: 1 | 2 | 3 | 4 | 5;
  pricePerDay: number;
  rating: number;
  reviews: string[];
  services: Services[];
}

export interface HotelFilters {
  city: Hotel['location']['city'] | 'Все';
  stars: Hotel['stars'] | 'Все';
  minPrice: number;
  maxPrice: number;
}
