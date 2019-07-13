import React, { Component, createRef } from 'react';
// import Input from 'components/Input';
import { Input } from 'antd';
import { Cell } from 'components/Table/table.theme';
import { Container, CellIcon } from './editablecell.theme';

interface Props {
  value: string;
  record: { [key: string]: string };
  dataIndex: string;
  title: string;
  align: 'left' | 'center' | 'right';
  name: string;
  onChange: Function;
}

class EditableCell extends Component<Props> {
  private input?: HTMLInputElement;

  state = {
    // value: this.props.record[this.props.dataIndex],
    // editable: false,
    editing: false,
  };

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // this.setState({
    //   value: e.currentTarget.value,
    // });
    console.log(this.props);
    this.props.onChange(e);
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (this.state.editing && this.input) this.input.focus();
    });
  };

  save = (e: React.SyntheticEvent<HTMLInputElement>) => {
    this.toggleEdit();
    // send data to form
  };

  // handleChange = e => {
  //   const value = e.target.value;
  //   this.setState({ value });
  // };

  // check = () => {
  //   this.setState({ editable: false });
  //   if (this.props.onChange) {
  //     this.props.onChange(this.state.value);
  //   }
  // };

  // edit = () => {
  //   this.setState({ editable: true });
  // };

  renderCell = () => {
    const { dataIndex, align, children } = this.props;
    const { editing } = this.state;

    return (
      <Input
        ref={node => {
          if (node) this.input = node.input;
        }}
        name={this.props.name}
        value={this.props.record[this.props.dataIndex]}
        onChange={this.onChange}
        // onBlur={this.save}
        style={{ textAlign: align }}
      />
    );

    // return editing ? (
    //   <Input
    //     ref={node => {
    //       if (node) this.input = node.input;
    //     }}
    //     name={this.props.name}
    //     value={this.props.record[this.props.dataIndex]}
    //     onChange={this.onChange}
    //     onBlur={this.save}
    //     style={{ textAlign: align }}
    //   />
    // ) : (
    //   <Cell editable onClick={this.toggleEdit}>
    //     {children}
    //   </Cell>
    // );
  };

  render() {
    const { record, dataIndex, title, onChange, children, ...rest } = this.props;

    return <td {...rest}>{this.renderCell()}</td>;

    // const { value, editable } = this.state;
    // return (
    //   <Container style={this.props.style || {}}>
    //     {editable ? (
    //       <div>
    //         <Input value={value} onChange={this.handleChange} onPressEnter={this.check} />
    //         <CellIcon type="check" onClick={this.check} />
    //       </div>
    //     ) : (
    //       <div>
    //         {value || ' '}
    //         <CellIcon type="edit" onClick={this.edit} />
    //       </div>
    //     )}
    //   </Container>
    // );
  }
}

export default EditableCell;
