'use client';

import { createContext } from 'react';

import ReservationsStore from './reservations-store';
import { ReservationsProviderProps } from './types';

export const ReservationsContext = createContext<ReservationsStore | null>(
  null
);
const reservationsStore = new ReservationsStore();

export function ReservationsProvider({ children }: ReservationsProviderProps) {
  return (
    <ReservationsContext.Provider value={reservationsStore}>
      {children}
    </ReservationsContext.Provider>
  );
}
