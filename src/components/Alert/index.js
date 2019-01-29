// @flow
import React, { Component } from 'react';
import { Alert as AntdAlert } from 'antd';
import type { Action } from 'actions/app';
import { PageContext } from 'layout/Page';

type State = {
  visible: boolean,
};

type Props = {
  data: {
    id: string,
    text: string,
    type: string,
  },
};

class Alert extends Component<Props, State> {
  state = {
    visible: true,
  };

  handleClose = (setMessages: (data: $PropertyType<Props, 'data'>, remove: boolean) => Action) => {
    const { data } = this.props;
    this.setState({ visible: false });
    setMessages(data, true);
  };

  render() {
    const { data } = this.props;
    const { visible } = this.state;
    return (
      <PageContext.Consumer>
        {({ setMessages }) => {
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
        }}
      </PageContext.Consumer>
    );
  }
}

export default Alert;
