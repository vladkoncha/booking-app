'use client';

import { createContext } from 'react';

import HotelsStore from './hotels-store';
import { HotelsProviderProps } from './types';

export const HotelsContext = createContext<HotelsStore | null>(null);
const hotelsStore = new HotelsStore();

export function HotelsProvider({ children }: HotelsProviderProps) {
  return (
    <HotelsContext.Provider value={hotelsStore}>
      {children}
    </HotelsContext.Provider>
  );
}
