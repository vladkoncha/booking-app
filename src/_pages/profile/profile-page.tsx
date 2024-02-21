'use client';

import { Flex, Typography } from 'antd';

import withAuth from '@/src/shared/hocs/withAuth';
import { EditPasswordForm } from '@/src/widgets/profile/edit-password-form';
import { EditProfileInfoForm } from '@/src/widgets/profile/edit-profile-info-form';
const { Title } = Typography;

export const ProfilePage = withAuth(() => {
  return (
    <Flex vertical gap="middle" style={{ padding: '1.5rem' }}>
      <Title style={{ marginBottom: '3rem' }}>Настройки профиля</Title>
      <Flex gap="middle" wrap="wrap">
        <EditProfileInfoForm />
        <EditPasswordForm />
      </Flex>
    </Flex>
  );
});
