import React, { HTMLAttributes } from 'react';
import { FormattedNumber, FormattedMessage } from 'react-intl';
import { createText } from './text.theme';
import localeStrings from 'locales/en.json';

interface Props {
  as?: string;
  value?: FormattedNumber.Props['value'];
  currency?: FormattedNumber.Props['currency'];
  textAlign?: 'left' | 'center' | 'right';
  textTransform?: string;
  intl?: keyof typeof localeStrings;
  values?: FormattedMessage.Props['values'];
  children?: React.ReactNode;
}

const TextComponent: React.FunctionComponent<Props> = ({
  as = 'span',
  textAlign,
  textTransform,
  intl,
  value,
  currency,
  values,
  children,
}) => {
  const Text = createText(as, { textAlign, textTransform });

  if (value) {
    return (
      <Text>
        <FormattedNumber value={value} style={currency ? 'currency' : ''} currency={currency} />
      </Text>
    );
  }

  return <Text>{intl ? <FormattedMessage id={intl} values={values} /> : children}</Text>;
};

export default TextComponent;
