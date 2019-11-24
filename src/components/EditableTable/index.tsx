import React, { PureComponent } from 'react';
import { injectIntl } from 'react-intl';
import { TableProps, ColumnProps } from 'antd/lib/table/interface';
import { Table } from 'antd';
import { AddButton } from './editabletable.theme';
import { Text } from 'components';
import EditableCell from 'components/EditableCell';

export interface EditableTableColumnProps<T> extends ColumnProps<T> {
  editable?: boolean;
  number?: boolean;
  currency?: string;
}

interface Props<T> extends TableProps<T>, ReactIntl.InjectedIntlProps {
  columns: EditableTableColumnProps<T>[];
  dataSourceKey: string;
  onCellChange: Function;
  updateData: Function;
}

class EditableTable<T> extends PureComponent<
  Props<{
    key: string;
    name: string;
    description: string;
    hours: number;
    amount: string;
  }>
> {
  handleAdd = () => {
    const { intl, dataSource = [] } = this.props;

    this.props.updateData({
      items: [
        ...dataSource,
        {
          key: dataSource.length + 1,
          name: intl.formatMessage({ id: 'invoice.form.item_name' }),
          description: intl.formatMessage({ id: 'invoice.form.item_description' }),
          hours: '0',
          amount: '0',
        },
      ],
    });
  };

  render() {
    const { className, dataSource, pagination = false, onCellChange } = this.props;
    const components = {
      body: {
        cell: EditableCell,
      },
    };
    const columns = this.props.columns.map(col => {
      return {
        ...col,
        onCell: (record: { key: string }) => {
          const {
            dataIndex,
            title,
            editable = false,
            number,
            currency,
            align = 'left',
            render,
          } = col;
          const name = `${this.props.dataSourceKey}[${parseFloat(record.key) - 1}].${dataIndex}`;
          return {
            record,
            dataIndex,
            title,
            align,
            editable,
            number,
            currency,
            name,
            render,
            onCellChange,
          };
        },
      };
    });

    return (
      <div>
        <Table
          components={components}
          className={className}
          dataSource={dataSource}
          columns={columns}
          pagination={pagination}
        />
        <AddButton size="small" icon="plus" onClick={this.handleAdd}>
          <Text intl="invoice.form.add_item" />
        </AddButton>
      </div>
    );
  }
}

export default injectIntl(EditableTable);
