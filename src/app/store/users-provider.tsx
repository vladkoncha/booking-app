'use client';

import { createContext } from 'react';

import { UsersProviderProps } from './types';
import UsersStore from './users-store';

export const UsersContext = createContext<UsersStore | null>(null);
const catsStore = new UsersStore();

export function UsersProvider({ children }: UsersProviderProps) {
  return (
    <UsersContext.Provider value={catsStore}>{children}</UsersContext.Provider>
  );
}
