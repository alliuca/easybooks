import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Cell, Input } from './editablecell.theme';
import InputNumber from 'components/InputNumber';

interface Props extends ReactIntl.InjectedIntlProps {
  width?: number;
  record: { [key: string]: string };
  dataIndex: string;
  title?: string;
  editable: boolean;
  number?: boolean;
  currency?: string;
  align: 'left' | 'center' | 'right';
  name: string;
  render?: Function;
  onCellChange: (target: { name: string; value: number | string }) => void;
}

class EditableCell extends Component<Props> {
  onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    this.props.onCellChange({ name, value });
  };

  // onNumberChange = (value: number | undefined) => {
  //   const { name } = this.props;
  //   this.props.onCellChange({ name, value });
  // };

  renderCell = () => {
    const { record, dataIndex, number = false, currency, name, align } = this.props;
    const value = record[dataIndex];

    return (
      <>
        {number ? (
          <InputNumber
            name={name}
            value={parseFloat(value)}
            onChange={this.props.onCellChange}
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
    const {
      record,
      dataIndex,
      title,
      editable,
      render,
      onCellChange,
      children,
      ...rest
    } = this.props;

    if (render) {
      return render(record);
    }

    return <Cell {...rest}>{editable ? this.renderCell() : children}</Cell>;
  }
}

export default injectIntl(EditableCell);
