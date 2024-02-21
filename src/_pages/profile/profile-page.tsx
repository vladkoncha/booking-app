'use client';

import { App, Flex, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

import { UsersContext } from '@/src/app/store/users/users-provider';
import { EditPasswordForm } from '@/src/widgets/profile/edit-password-form';
import { EditProfileInfoForm } from '@/src/widgets/profile/edit-profile-info-form';
const { Title } = Typography;

export const ProfilePage = () => {
  const router = useRouter();
  const { notification } = App.useApp();
  const usersStore = useContext(UsersContext);
  const user = usersStore?.getCurrentUser();

  useEffect(() => {
    if (!user) {
      notification?.error({
        message: 'Пользователь не авторизован',
      });
      router.push('/login');
    }
  }, [notification, router, user]);

  if (!user) {
    return null;
  }

  return (
    <Flex vertical gap="middle" style={{ padding: '1.5rem' }}>
      <Title style={{ marginBottom: '3rem' }}>Настройки профиля</Title>
      <Flex gap="middle" wrap="wrap">
        <EditProfileInfoForm />
        <EditPasswordForm />
      </Flex>
    </Flex>
  );
};
