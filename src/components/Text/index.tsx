import React from 'react';
import { FormattedNumber, FormattedMessage, FormattedDate } from 'react-intl';
import { createText } from './text.theme';
import localeStrings from 'locales/en.ts';

interface Props {
  as?: string;
  type?: 'number' | 'date';
  value?: FormattedNumber.Props['value'] | FormattedDate.Props['value'];
  currency?: FormattedNumber.Props['currency'];
  textAlign?: 'left' | 'center' | 'right';
  textTransform?: string;
  intl?: keyof typeof localeStrings;
  values?: FormattedMessage.Props['values'];
  children?: React.ReactNode;
}

const TextComponent: React.FunctionComponent<Props> = ({
  as = 'span',
  type,
  textAlign,
  textTransform,
  intl,
  value,
  currency,
  values,
  children,
}) => {
  const Text = createText(as, { textAlign, textTransform });

  if (type === 'date' && value && typeof value === 'string') {
    return (
      <Text>
        <FormattedDate value={value} timeZone="UTC" year="numeric" month="2-digit" day="2-digit" />
      </Text>
    );
  }

  if (typeof value === 'number') {
    return (
      <Text>
        <FormattedNumber
          value={value}
          style={currency ? 'currency' : ''}
          currency={currency}
          minimumFractionDigits={0}
        />
      </Text>
    );
  }

  return <Text>{intl ? <FormattedMessage id={intl} values={values} /> : children}</Text>;
};

export default TextComponent;
