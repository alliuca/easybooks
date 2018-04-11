import React, { Component } from 'react';
import { css } from 'emotion';
import { Input, Icon } from 'antd';

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
      <div className={styles.editableCell} style={this.props.style || {}}>
        { editable
          ? (
            <div className={styles.editableCellInputWrapper}>
              <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
              />
              <Icon
                type="check"
                className={styles.editableCellIconCheck}
                onClick={this.check}
              />
            </div>
          ) : (
            <div>
              { value || ' ' }
              <Icon
                type="edit"
                className={styles.editableCellIcon}
                onClick={this.edit}
              />
            </div>
          )
        }
      </div>
    );
  }
}

const styles = {
  editableCell: css`
    position: relative;
    display: inline-block;
    padding-right: 24px;

    &:hover .anticon-edit {
      display: inline-block;
    }
  `,
  editableCellInputWrapper: css`
    ${'' /* padding-right: 24px; */}
  `,
  editableCellIcon: css`
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
    line-height: 18px;
    display: none;

    &:hover {
      color: #108ee9;
    }
  `,
  editableCellIconCheck: css`
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
    line-height: 28px;

    &:hover {
      color: #108ee9;
    }
  `,
}

export default EditableCell;
