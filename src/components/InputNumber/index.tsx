import React, { PureComponent } from 'react';
import { injectIntl } from 'react-intl';
import { InputNumberProps } from 'antd/lib/input-number';
import { CurrencyValues } from 'actions/invoices';
import InputNumber from './inputnumber.theme';

type ToOmit = 'name' | 'value' | 'onChange';

export interface Props extends Omit<InputNumberProps, ToOmit>, ReactIntl.InjectedIntlProps {
  name: string;
  value: number | undefined;
  onChange: (target: { name: string; value: number }) => void;
  currency?: string;
  align?: 'left' | 'center' | 'right';
}

class InputNumberComponent extends PureComponent<Props> {
  getLocaleParts() {
    const {
      intl: { locale },
      currency,
    } = this.props;
    const formatterOpts = currency ? { style: 'currency', currency: CurrencyValues.EUR } : {};
    const sampleNumber = 1.1;
    const parts = Intl.NumberFormat(locale, formatterOpts).formatToParts(sampleNumber);
    const decimalPart = parts && parts.find(part => part.type === 'decimal');

    let decimal = '.';
    let currencyIdx;
    if (decimalPart) decimal = decimalPart.value;
    currencyIdx = parts && parts.findIndex(part => part.type === 'currency');
    return { decimal, currencyIdx };
  }

  render() {
    const { name, currency, onChange, align = 'left' } = this.props;
    const { decimal, currencyIdx } = this.getLocaleParts();

    return (
      <InputNumber
        {...this.props}
        formatter={
          currencyIdx > -1
            ? value => (currencyIdx === 0 ? `${currency} ${value}` : `${value} ${currency}`)
            : undefined
        }
        decimalSeparator={decimal}
        onChange={
          onChange
            ? value => {
                if (value) onChange({ name, value });
              }
            : undefined
        }
        align={align}
      />
    );
  }
}

export default injectIntl(InputNumberComponent);
