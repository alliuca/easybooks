import React, { Component } from 'react';
import { Input } from 'antd';
import { Container, CellIcon } from './editablecell.theme';

class EditableCell extends Component {
  state = {
    value: this.props.value,
    editable: false,
  }

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }

  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }

  edit = () => {
    this.setState({ editable: true });
  }

  render() {
    const { value, editable } = this.state;
    return (
      <Container style={this.props.style || {}}>
        { editable
          ? (
            <div>
              <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
              />
              <CellIcon
                type="check"
                onClick={this.check}
              />
            </div>
          ) : (
            <div>
              { value || ' ' }
              <CellIcon
                type="edit"
                onClick={this.edit}
              />
            </div>
          )
        }
      </Container>
    );
  }
}

export default EditableCell;
