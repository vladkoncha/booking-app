'use client';

import { App, Button, Flex, Form, Input, theme, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';

import { UsersContext } from '@/src/app/store/users/users-provider';

import { FormModel } from './types';

const { Title } = Typography;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

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
    <Flex vertical gap="middle" align="center" style={{ flex: 1 }}>
      <Flex vertical style={{ width: '100%' }}>
        <Form
          {...formItemLayout}
          name="login"
          onFinish={handleSubmit}
          initialValues={{ name: user?.name ?? '', phone: user?.phone }}
          style={{
            maxWidth: '45rem',
            background: token.colorFillAlter,
            borderRadius: token.borderRadiusLG,
            padding: '1.5rem',
          }}
          scrollToFirstError
        >
          <Title level={2} style={{ textAlign: 'center' }}>
            Данные профиля
          </Title>
          <Form.Item
            name="name"
            label="Имя"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите ваше имя',
                whitespace: true,
              },
              {
                validator: (_, value: string) =>
                  !value || value.length <= 60
                    ? Promise.resolve()
                    : Promise.reject(new Error('Слишком длинное имя')),
              },
            ]}
          >
            <Input maxLength={60} />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Номер телефона"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите ваш номер телефона',
              },
              {
                validator: (_, value: string) =>
                  !value || value.length === 10
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error(
                          'Некорректная длина, проверьте номер телефона'
                        )
                      ),
              },
              {
                validator: (_, value: string) =>
                  !value || value.match(/^[0-9]*$/)
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error(
                          'Номер телефона должен содержать только цифры'
                        )
                      ),
              },
            ]}
          >
            <Input addonBefore="+7" style={{ width: '100%' }} maxLength={10} />
          </Form.Item>

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
