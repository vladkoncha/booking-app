'use client';

import { createContext } from 'react';

import { UsersProviderProps } from './types';
import UsersStore from './users-store';

export const UsersContext = createContext<UsersStore | null>(null);
const usersStore = new UsersStore();

export function UsersProvider({ children }: UsersProviderProps) {
  return (
    <UsersContext.Provider value={usersStore}>{children}</UsersContext.Provider>
  );
}
