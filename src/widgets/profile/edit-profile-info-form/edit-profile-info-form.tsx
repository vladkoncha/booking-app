'use client';

import { App, Button, Flex, Form, theme, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';

import { UsersContext } from '@/src/app/store/users/users-provider';
import { NameInput } from '@/src/features/name-input';
import { PhoneInput } from '@/src/features/phone-input';

import { formItemLayout, getformStyle, tailFormItemLayout } from '../styles';
import { FormModel } from './types';

const { Title } = Typography;

export const EditProfileInfoForm = observer(() => {
  const { token } = theme.useToken();
  const usersStore = useContext(UsersContext);
  const { notification } = App.useApp();

  const user = usersStore?.getCurrentUser();

  const handleSubmit = (values: FormModel) => {
    if (!user) {
      notification?.error({
        message: 'Ошибка редактирования профиля',
        description: 'Пользователь не существует',
      });
      return;
    }

    user.name = values.name;
    user.phone = values.phone;

    notification?.success({
      message: 'Данные профиля обновлены!',
    });
  };

  return (
    <Flex vertical gap="middle" align="center" style={{ flexGrow: 1 }}>
      <Flex vertical style={{ width: '100%' }}>
        <Form
          {...formItemLayout}
          labelWrap
          name="login"
          onFinish={handleSubmit}
          initialValues={{ name: user?.name ?? '', phone: user?.phone }}
          style={getformStyle(token)}
          scrollToFirstError
        >
          <Title level={2} style={{ textAlign: 'center' }}>
            Данные профиля
          </Title>

          <NameInput />

          <PhoneInput />

          <Form.Item {...tailFormItemLayout}>
            <Button
              style={{ width: '100%' }}
              size="middle"
              type="primary"
              htmlType="submit"
            >
              Сохранить данные
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Flex>
  );
});
