import React, { Component } from 'react';
import { Alert as AntdAlert } from 'antd';
import { PageContext } from 'layout/Page';

class Alert extends Component {
  state = {
    visible: true,
  }

  handleClose = (setMessages) => {
    const { data } = this.props;
    this.setState({ visible: false });
    setMessages(data, true);
  }

  render() {
    const { data } = this.props;
    const { visible } = this.state;
    return (
      <PageContext.Consumer>
        { ({ setMessages }) => {
          if (visible) {
            return (
              <AntdAlert
                message={data.text}
                type={data.type}
                showIcon
                closable
                afterClose={this.handleClose.bind(this, setMessages)}
              />
            );
          } else {
            return null;
          }
        } }
      </PageContext.Consumer>
    );
  }
}

export default Alert;
