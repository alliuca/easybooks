import React, { PureComponent } from 'react';
import { injectIntl } from 'react-intl';
import { TableProps, ColumnProps } from 'antd/lib/table/interface';
import { Table, Popconfirm } from 'antd';
import { AddButton } from './editabletable.theme';
import { Text, Button } from 'components';
import EditableCell from 'components/EditableCell';

export interface EditableTableColumnProps<T> extends ColumnProps<T> {
  key?: string;
  editable?: boolean;
  number?: boolean;
  currency?: string;
}

type DataSource = any[] & {
  key: string;
  name: string;
  description?: string;
  hours?: number;
  amount?: string;
  value?: string;
}[]

export interface Props<T> extends TableProps<T>, ReactIntl.InjectedIntlProps {
  columns: EditableTableColumnProps<T>[];
  dataSource: DataSource;
  dataSourceKey: string;
  onCellChange: Function;
  updateData: Function;
}

class EditableTable<T> extends PureComponent<
  Props<T>
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

  handleDelete = (key: string) => {
    const { dataSource = [] } = this.props;

    this.props.updateData({
      items: dataSource.filter(item => item.key !== key),
    });
  };

  render() {
    const { intl, className, dataSource, pagination = false, onCellChange } = this.props;
    const components = {
      body: {
        cell: EditableCell,
      },
    };

    let columns = [...this.props.columns];
    columns.push({
      key: 'actions',
      align: 'right',
      render: record => (
        <td style={{ width: '50px' }}>
          <Popconfirm
            title={
              <Text
                intl="confirm.delete"
                values={{ type: intl.formatMessage({ id: 'confirm.types.item' }) }}
              />
            }
            onConfirm={this.handleDelete.bind(this, record.key)}
            onCancel={() => {}}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" icon="delete" />
          </Popconfirm>
        </td>
      ),
    });
    columns = columns.map(col => {
      return {
        ...col,
        onCell: (record) => {
          const {
            dataIndex,
            title,
            editable = false,
            number,
            currency,
            align = 'left',
            render,
          } = col;
          const name = `${this.props.dataSourceKey}[${parseFloat((record as any).key) - 1}].${dataIndex}`; // TODO: Fix this TS thing
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
