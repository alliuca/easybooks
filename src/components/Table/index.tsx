import React from 'react';
import { Table as AntdTable } from 'antd';
import { TableProps } from 'antd/lib/table/interface';

export interface Props<T> extends TableProps<T> {}

const Table = <T extends {}>({ columns, dataSource, ...props }: Props<T>) => (
  <AntdTable columns={columns} dataSource={dataSource} {...props} />
);

export default Table;
