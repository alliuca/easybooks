import React, { PureComponent } from 'react';
import { TableProps, ColumnProps } from 'antd/lib/table/interface';
import { Table } from 'antd';

export interface EditableTableColumnProps<T> extends ColumnProps<T> {
  editable?: boolean;
}

interface Props<T> extends TableProps<T> {
  columns?: EditableTableColumnProps<T>[];
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
    const { className, dataSource, columns, pagination = false } = this.props;

    return (
      <div>
        <Table
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
