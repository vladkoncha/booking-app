'use client';

import { App } from 'antd';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

import { UsersContext } from '@/src/app/store/users/users-provider';

type Props = {
  [key in string]: any;
};

const withAuth = <T extends Props>(
  WrappedComponent: React.ComponentType<T>
) => {
  const Wrapper = (props: T) => {
    const router = useRouter();
    const { notification } = App.useApp();
    const usersStore = useContext(UsersContext);
    const user = usersStore?.getCurrentUser();

    useEffect(() => {
      if (!user) {
        notification?.error({
          message: 'Пользователь не авторизован',
        });
        router.replace('/login');
      }
    }, [notification, router, user]);

    if (!user) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
