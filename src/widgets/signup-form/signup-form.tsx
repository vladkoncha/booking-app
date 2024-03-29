'use client';

import { App, Button, Checkbox, Flex, Form, Input, Typography } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

import { UsersContext } from '@/src/app/store/users/users-provider';
import { NameInput } from '@/src/features/name-input';
import { PhoneInput } from '@/src/features/phone-input';
import { User } from '@/src/shared/models';

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

export const SignupForm = () => {
  const usersStore = useContext(UsersContext);
  const { notification } = App.useApp();
  const router = useRouter();

  const handleSubmit = (values: FormModel) => {
    if (usersStore?.getUser(values.email)) {
      notification?.error({
        message: 'Ошибка регистрации',
        description: 'Пользователь с таким email уже существует',
      });
      return;
    }

    const user: User = {
      ...values,
    };
    usersStore?.addUser(user);
    usersStore?.setCurrentUserEmail(user.email);
    notification?.success({
      message: 'Вы успешно зарегистрировались!',
      description: 'Переходим на главную страницу',
    });
    router.push('/');
  };

  return (
    <Flex vertical gap="middle" align="center">
      <Flex vertical style={{ marginBlockStart: '3rem', padding: '2rem' }}>
        <Title>Добро пожаловать на ТревелБук!</Title>
        <Form
          {...formItemLayout}
          name="signup"
          onFinish={handleSubmit}
          style={{ maxWidth: 600 }}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'Некорректный email адрес',
              },
              {
                required: true,
                message: 'Пожалуйста, введите ваш email адрес',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            hasFeedback
            name="password"
            label="Пароль"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите пароль',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            hasFeedback
            name="confirm"
            label="Подтвердите пароль"
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: 'Пожалуйста, подтвердите ваш пароль',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('Введенные пароли не совпадают!')
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <NameInput />

          <PhoneInput />

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error('Пожалуйста, прочитайте и примите условия')
                      ),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              Я прочитал(а) <Link href="">условия</Link>
            </Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button
              style={{ width: '100%' }}
              size="large"
              type="primary"
              htmlType="submit"
            >
              Создать аккаунт
            </Button>
          </Form.Item>
        </Form>
        <Typography.Text strong style={{ alignSelf: 'flex-end' }}>
          Уже есть аккаунт? <Link href="/login">Войти</Link>
        </Typography.Text>
      </Flex>
    </Flex>
  );
};
