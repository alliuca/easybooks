import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Cell, Input, Prefix } from './editablecell.theme';
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
  // onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { currency } = this.props;
  //   this.props.onCellChange(e, currency ? { type: 'number' } : {});
  // };

  onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    this.props.onCellChange({ name, value });
  };

  onNumberChange = (value: number | undefined) => {
    const { name } = this.props;
    this.props.onCellChange({ name, value });
  };

  // renderCurrencyAffix = (value: any) => {
  //   const { intl, record, dataIndex, currency } = this.props;
  //   const numberFormat = new Intl.NumberFormat(intl.locale, {
  //     minimumFractionDigits: 0,
  //   });
  //   const currencyFormat = new Intl.NumberFormat(intl.locale, {
  //     style: 'currency',
  //     currency,
  //     minimumFractionDigits: 0,
  //   });
  //   const number = record[dataIndex];
  //   const formattedCurrency = currencyFormat.format(parseFloat(number));
  //   const formattedNumber = numberFormat.format(parseFloat(number));
  //   const symbol = formattedCurrency.replace(formattedNumber, '').trim();

  //   if (formattedCurrency.indexOf(formattedNumber) > 0) {
  //     const prefix = (
  //       <Prefix>
  //         {symbol}
  //         <span>{value}</span>
  //       </Prefix>
  //     );
  //     return { type: 'prefix', value: prefix };
  //   } else {
  //     return { type: 'suffix', value: symbol };
  //   }
  // };

  renderCell = () => {
    const { intl, record, dataIndex, number, currency, name, align, children } = this.props;
    console.log('record', record);
    // const affix = currency ? this.renderCurrencyAffix(record[dataIndex]) : null;
    // console.log(affix);

    // if (currency) {
    //   var numberFormat = new Intl.NumberFormat(undefined, {
    //     style: 'currency',
    //     currency,
    //     minimumFractionDigits: 0,
    //     useGrouping: false,
    //   });
    //   const formatted = numberFormat.format(parseFloat('1440.65'));
    //   const symbol = formatted.replace('1440.65', '');
    //   if (formatted.indexOf('1440.65') > 0) {
    //     prefix = <div>{symbol}</div>;
    //   } else {
    //     suffix = symbol;
    //   }
    // }

    // const value = currency
    //   ? intl.formatNumber(parseFloat(record[dataIndex]), {
    //       minimumFractionDigits: 0,
    //       useGrouping: false,
    //     })
    //   : record[dataIndex];
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
        {/* {affix && affix.type === 'prefix' ? affix.value : null} */}
      </>
    );

    // return (
    //   <>
    //     <Input
    //       name={name}
    //       value={value}
    //       onChange={this.onChange}
    //       align={align}
    //       suffix={affix && affix.type === 'suffix' ? affix.value : null}
    //     />
    //     {affix && affix.type === 'prefix' ? affix.value : null}
    //   </>
    // );
  };

  render() {
    const { record, dataIndex, title, editable, onCellChange, children, ...rest } = this.props;
    return <Cell {...rest}>{editable ? this.renderCell() : children}</Cell>;
  }
}

export default injectIntl(EditableCell);
