import React from 'react';
import { Text } from 'components';
import { CurrencyValues } from 'actions/invoices';

interface Props {
  value: number;
  currency: keyof typeof CurrencyValues;
}

const Currency = ({ value, currency }: Props) => (
  <Text type="number" value={value} currency={currency} />
);

export default Currency;
