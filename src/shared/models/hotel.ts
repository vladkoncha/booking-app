import { CITIES, SERVICES } from '../constants';

export interface Service {
  name: (typeof SERVICES)[number];
  price: number;
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
  services: Service[];
}

export interface HotelFilters {
  city: Hotel['location']['city'] | 'Все';
  stars: Hotel['stars'] | 'Все';
  minPrice: number;
  maxPrice: number;
}
