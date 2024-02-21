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

export const EditPasswordForm = observer(() => {
  const { token } = theme.useToken();
  const usersStore = useContext(UsersContext);
  const { notification } = App.useApp();
  const [form] = Form.useForm<FormModel>();

  const user = usersStore?.getCurrentUser();

  const handleSubmit = (values: FormModel) => {
    if (!user) {
      notification?.error({
        message: 'Ошибка смены пароля',
        description: 'Пользователь не существует',
      });
      return;
    }

    user.password = values.new;
    form.resetFields();
    notification?.success({
      message: 'Вы успешно сменили пароль!',
    });
  };

  return (
    <Flex vertical gap="middle" align="center" style={{ flex: 1 }}>
      <Flex vertical style={{ width: '100%' }}>
        <Form
          {...formItemLayout}
          form={form}
          name="login"
          onFinish={handleSubmit}
          style={{
            maxWidth: '45rem',
            background: token.colorFillAlter,
            borderRadius: token.borderRadiusLG,
            padding: '1.5rem',
          }}
          scrollToFirstError
        >
          <Title level={2} style={{ textAlign: 'center' }}>
            Смена пароля
          </Title>
          <Form.Item
            hasFeedback
            name="old"
            label="Текущий пароль"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите ваш текущий пароль',
              },
              () => ({
                validator(_, value) {
                  if (!value || user?.password === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Неверный текущий пароль'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            hasFeedback
            name="new"
            label="Новый пароль"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите новый текущий пароль',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            hasFeedback
            name="confirm"
            label="Подтвердите новый пароль"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, подтвердите новый пароль',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('new') === value) {
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

          <Form.Item {...tailFormItemLayout}>
            <Button
              style={{ width: '100%' }}
              size="middle"
              type="primary"
              htmlType="submit"
            >
              Сменить пароль
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Flex>
  );
});
