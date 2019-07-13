import React, { PureComponent } from 'react';
import { TableProps, ColumnProps } from 'antd/lib/table/interface';
import { Table } from 'antd';
import EditableCell from 'components/EditableCell';

export interface EditableTableColumnProps<T> extends ColumnProps<T> {
  editable?: boolean;
}

interface Props<T> extends TableProps<T> {
  columns: EditableTableColumnProps<T>[];
  dataSourceKey: string;
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
  render() {
    const { className, dataSource, pagination = false, onChange } = this.props;
    const components = {
      body: {
        cell: EditableCell,
      },
    };
    const columns = this.props.columns.map(col => {
      return {
        ...col,
        onCell: (record: { key: string }) => {
          const { dataIndex, title, align = 'left' } = col;
          const name = `${this.props.dataSourceKey}.${parseFloat(record.key) - 1}.${dataIndex}`;
          return {
            record,
            dataIndex,
            title,
            align,
            name,
            onChange,
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
      </div>
    );
  }
}

export default EditableTable;
