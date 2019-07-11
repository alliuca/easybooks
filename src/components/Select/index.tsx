import React from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
const { Option } = Select;

// https://mariusschulz.com/blog/typescript-2-9-passing-generics-to-jsx-elements
type OptionValue = string | number;

type Option<T extends OptionValue> = {
  value: T;
  label: string;
};

type Props<T extends OptionValue> = {
  options: Option<T>[];
  value: T;
  onChange: SelectProps['onChange'];
};

const SelectComponent = <T extends OptionValue>(props: Props<T>) => {
  const { options, value, onChange } = props;
  const defaultValue = options[0].value;

  return (
    <Select defaultValue={defaultValue} value={value || defaultValue} onChange={onChange}>
      {options.map(o => {
        return (
          <Option key={o.value} value={o.value}>
            {o.label}
          </Option>
        );
      })}
    </Select>
  );
};

export default SelectComponent;
