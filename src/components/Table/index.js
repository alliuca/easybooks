import React from 'react';
import { Table as AntdTable } from 'antd';

const onChange = (pagination, filters, sorter) => {
  console.log('params', pagination, filters, sorter);
};

const Table = ({ columns, data }) => (
  <AntdTable
    columns={columns}
    dataSource={data}
    onChange={onChange}
  />
);

export default Table;
