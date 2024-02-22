import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ReactNode } from 'react';

import { AntdAppProvider } from './providers/antd-app-provider';
import { LocaleProvider } from './providers/locale-provider';
import { PxToRemProvider } from './providers/px-to-rem-provider';
import { HotelsProvider } from './store/hotels/hotels-provider';
import { ReservationsProvider } from './store/reservations/reservations-provider';
import { UsersProvider } from './store/users/users-provider';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AntdRegistry>
      <LocaleProvider>
        <PxToRemProvider>
          <AntdAppProvider>
            <UsersProvider>
              <HotelsProvider>
                <ReservationsProvider>{children}</ReservationsProvider>
              </HotelsProvider>
            </UsersProvider>
          </AntdAppProvider>
        </PxToRemProvider>
      </LocaleProvider>
    </AntdRegistry>
  );
};
