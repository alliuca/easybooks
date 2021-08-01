import React, { ChangeEvent } from 'react';
import { InputProps, GroupProps } from 'antd/lib/input';
import Input, { Group } from './input.theme';

export interface Props extends Omit<InputProps, 'onChange'> {
  onChange: (target: EventTarget) => void;
  align?: 'left' | 'center' | 'right';
}

const InputComponent: React.FunctionComponent<Props> = props => {
  const { id, name, value, onChange, align = 'left' } = props;

  return (
    <Input
      {...props}
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

export const InputGroup = (props: GroupProps) => <Group {...props}>{props.children}</Group>;

export default InputComponent;
