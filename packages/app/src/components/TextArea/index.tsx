import React, { ChangeEvent } from 'react';
import Input from 'antd/es/input';
import { TextAreaProps } from 'antd/lib/input/TextArea';
const { TextArea } = Input;

interface Props extends Omit<TextAreaProps, 'onChange'> {
  onChange: Function;
}

const TextAreaComponent: React.FunctionComponent<Props> = ({
  name,
  value,
  rows,
  cols,
  autosize = true,
  onChange,
}) => {
  return (
    <TextArea
      name={name}
      value={value}
      rows={rows}
      cols={cols}
      autosize={autosize}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.currentTarget)}
    />
  );
};

export default TextAreaComponent;
