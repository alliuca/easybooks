import React, { ChangeEvent } from 'react';
import { InputProps } from 'antd/lib/input';
import Input from './input.theme';

export interface Props extends Omit<InputProps, 'onChange'> {
  onChange: (target: EventTarget) => void;
  align?: 'left' | 'center' | 'right';
}

const InputComponent: React.FunctionComponent<Props> = ({
  id,
  name,
  value,
  onChange,
  align = 'left',
}) => {
  return (
    <Input
      id={id}
      name={name}
      value={value}
      onChange={
        onChange
          ? (e: ChangeEvent<HTMLInputElement>) => {
              onChange(e.currentTarget);
            }
          : undefined
      }
      align={align}
    />
  );
};

export default InputComponent;
