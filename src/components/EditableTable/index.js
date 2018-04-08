import React, { Component } from 'react';
import { css } from 'emotion';
import { Table, Button } from 'antd';
import EditableCell from './../EditableCell';

class EditableTable extends Component {
  constructor(props) {
    super(props);
    this.columns = props.columns;
    props.editableCells.map(c =>
      this.columns[this.columns.findIndex(col => col.dataIndex === c)].render = (text, record) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(record.key, c)}
        />
      )
    );
    this.state = props.data;
  }

  onCellChange = (key, dataIndex) => {
    return value => {
      const dataSource = [...this.state.dataSource];
      const target = dataSource.find(item => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.setState({ dataSource });
        this.props.updateData(dataSource);
      }
    }
  }

  onDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  }

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      description: 'Item Description',
      hours: '0',
      amount: '0',
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    }, () => this.props.updateData(this.state.dataSource));
  }

  render() {
    const { dataSource } = this.state;
    const columns = this.columns;
    return (
      <div>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
        />
        <Button className={styles.addButton} onClick={this.handleAdd}>Add Item</Button>
      </div>
    );
  }
}

const styles = {
  addButton: css`
    display: block;
    margin: 20px auto 0;
  `,
};

export default EditableTable;
