import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Cell, Input } from './editablecell.theme';
import InputNumber from 'components/InputNumber';

interface Props extends ReactIntl.InjectedIntlProps {
  record: { [key: string]: string };
  dataIndex: string;
  title: string;
  editable: boolean;
  number: boolean;
  currency: string;
  align: 'left' | 'center' | 'right';
  name: string;
  onCellChange: Function;
}

class EditableCell extends Component<Props> {
  onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    this.props.onCellChange({ name, value });
  };

  onNumberChange = (value: number | undefined) => {
    const { name } = this.props;
    this.props.onCellChange({ name, value });
  };

  renderCell = () => {
    const { record, dataIndex, number, currency, name, align } = this.props;
    const value = record[dataIndex];

    return (
      <>
        {number ? (
          <InputNumber
            name={name}
            value={parseFloat(value)}
            onChange={this.onNumberChange}
            currency={currency}
            align={align}
          />
        ) : (
          <Input name={name} value={value} onChange={this.onTextChange} align={align} />
        )}
      </>
    );
  };

  render() {
    const { record, dataIndex, title, editable, onCellChange, children, ...rest } = this.props;
    return <Cell {...rest}>{editable ? this.renderCell() : children}</Cell>;
  }
}

export default injectIntl(EditableCell);
