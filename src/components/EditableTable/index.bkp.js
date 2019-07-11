import React, { Component } from 'react';
import { Table } from 'antd';
import { AddButton } from './editabletable.theme';
import EditableCell from 'components/EditableCell';

class EditableTable extends Component {
  constructor(props) {
    super(props);
    this.columns = props.columns;
    props.editableCells.map(
      c =>
        (this.columns[this.columns.findIndex(col => col.dataIndex === c)].render = (
          text,
          record
        ) => {
          if (c === 'description') {
            return (
              <>
                <EditableCell
                  value={record.name}
                  onChange={this.onCellChange(record.key, c, 'name')}
                  style={{ display: 'block', marginBottom: 7, fontSize: '12px' }}
                />
                <EditableCell
                  value={text}
                  onChange={this.onCellChange(record.key, c, 'value')}
                  style={{ display: 'block' }}
                />
              </>
            );
          }
          if (c === 'amount') {
            return (
              <>
                € <EditableCell value={text} onChange={this.onCellChange(record.key, c)} />
              </>
            );
          }
          return <EditableCell value={text} onChange={this.onCellChange(record.key, c)} />;
        })
    );
    this.state = {
      dataSource: props.data,
      count: 1,
    };
  }

  componentDidUpdate({ data }) {
    if (this.props.data !== data)
      return this.setState({ ...this.state, dataSource: [] }, () =>
        this.setState({ ...this.state, dataSource: this.props.data })
      );
  }

  onCellChange = (key, dataIndex, input) => {
    return value => {
      const dataSource = [...this.state.dataSource];
      const target = dataSource.find(item => item.key === key);
      if (target) {
        if (input && input !== 'value') {
          target['name'] = value;
        } else {
          target[dataIndex] = value;
        }
        this.setState({ dataSource });
        this.props.updateData(dataSource);
      }
    };
  };

  onDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: 'Item Name',
      description: 'Item Description',
      hours: '0',
      amount: '0',
    };
    this.setState(
      {
        dataSource: [...dataSource, newData],
        count: count + 1,
      },
      () => this.props.updateData(this.state.dataSource)
    );
  };

  render() {
    const { dataSource } = this.state;
    const columns = this.columns;
    return (
      <div>
        <Table dataSource={dataSource} columns={columns} pagination={false} />
        <AddButton onClick={this.handleAdd}>Add Item</AddButton>
      </div>
    );
  }
}

export default EditableTable;
