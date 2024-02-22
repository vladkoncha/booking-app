'use client';

import {
  AutoComplete,
  Button,
  Col,
  Form,
  InputNumber,
  Row,
  Select,
  theme,
} from 'antd';
import { useContext } from 'react';

import { HotelsContext } from '@/src/app/store/hotels/hotels-provider';
import { CITIES_OPTIONS } from '@/src/shared/constants';
import { HotelFilters } from '@/src/shared/models';

import { FormModel } from './types';

const cityOptions = CITIES_OPTIONS.map((cityFilter) => ({ value: cityFilter }));
const starsOptions = ['Все', 1, 2, 3, 4, 5].map((starFilter) => ({
  value: starFilter,
  label: starFilter !== 'Все' ? `${starFilter}*` : starFilter,
}));

export const HotelsFilter = () => {
  const hotelsStore = useContext(HotelsContext);
  const { token } = theme.useToken();
  const [form] = Form.useForm<FormModel>();

  const formStyle: React.CSSProperties = {
    maxWidth: 'none',
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: '0.75rem',
    margin: '0.5rem',
    display: 'flex',
    justifyContent: 'center',
  };

  const handleSubmit = (values: FormModel) => {
    const filters: HotelFilters = {
      city: values.city || 'Все',
      stars: values.stars || 'Все',
      minPrice: values.minPrice || 0,
      maxPrice: values.maxPrice || Number.MAX_SAFE_INTEGER,
    };

    hotelsStore?.setFilters(filters);
  };

  return (
    <Form
      form={form}
      scrollToFirstError
      name="hotels-filter"
      onFinish={handleSubmit}
      style={formStyle}
      initialValues={{
        stars: 'Все',
        minPrice: 0,
        maxPrice: 500000,
      }}
    >
      <Row gutter={8}>
        <Col>
          <Form.Item
            name="city"
            label="Город"
            rules={[
              () => ({
                validator(_, value) {
                  if (!value || CITIES_OPTIONS.includes(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Выберите город из списка'));
                },
              }),
            ]}
          >
            <AutoComplete
              style={{ minWidth: '12rem', width: '100%' }}
              options={cityOptions}
              placeholder="Все"
              filterOption={(inputValue, option) =>
                option!.value
                  .toUpperCase()
                  .indexOf(inputValue.toUpperCase()) !== -1
              }
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name="stars" label="Звёздность">
            <Select style={{ minWidth: '6rem' }} options={starsOptions} />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item>
            <Form.Item
              name="minPrice"
              label="От"
              style={{
                display: 'inline-block',
                width: 'calc(50% - 12px)',
                marginRight: '0.5rem',
              }}
            >
              <InputNumber addonAfter="₽" min={0} />
            </Form.Item>
            <Form.Item
              name="maxPrice"
              label="До"
              style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
            >
              <InputNumber addonAfter="₽" min={1} />
            </Form.Item>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item>
            <Button size="middle" type="primary" htmlType="submit">
              Найти
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
