import React, { Component } from 'react';
import { Alert as AntdAlert } from 'antd';
import { InvoicesContext } from './../../pages/Invoices';

class Alert extends Component {
  state = {
    visible: true,
  }

  handleClose = (updateMessages) => {
    const { data: { id } } = this.props;
    this.setState({ visible: false });
    updateMessages(id);
  }

  render() {
    const { data } = this.props;
    const { visible } = this.state;
    return (
      <InvoicesContext.Consumer>
        { ({ updateMessages }) => {
          if (visible) {
            return (
            <AntdAlert
              message={data.text}
              type={data.type}
              showIcon
              closable
              afterClose={this.handleClose.bind(this, updateMessages)}
            />
          );
        } else {
          return null;
        }
      } }
      </InvoicesContext.Consumer>
    );
  }
}

export default Alert;
