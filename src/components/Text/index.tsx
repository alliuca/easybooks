import React from 'react';
import { FormattedMessage } from 'react-intl';
import { createText } from './text.theme';

interface Props {
  as?: string;
  textTransform?: string;
  intl?: string;
  values?: FormattedMessage.Props['values'];
  children?: React.ReactNode;
}

const TextComponent: React.FunctionComponent<Props> = ({
  as = 'span',
  textTransform,
  intl,
  values,
  children,
}) => {
  const Text = createText(as, { textTransform });
  return <Text>{intl ? <FormattedMessage id={intl} values={values} /> : children}</Text>;
};

export default TextComponent;
