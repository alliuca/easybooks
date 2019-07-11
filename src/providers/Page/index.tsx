import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { Message, setMessages } from 'actions/app';
import { RootState } from 'reducers';
import { Provider } from './context';

export interface Props extends RouteComponentProps {
  children: string | React.ReactNode;
  messages: Message[];
  setMessages: typeof setMessages;
  sider?: boolean;
  goTo: Function;
}

class Page extends Component<Props> {
  goTo = (path: string) => {
    const { history } = this.props;
    history.push(path);
  };

  render() {
    const { children, messages, setMessages } = this.props;

    return <Provider value={{ messages, setMessages, goTo: this.goTo }}>{children}</Provider>;
  }
}

const mapStateToProps = ({ app: { messages } }: RootState) => ({
  messages,
});

const mapDispatchToProps = {
  setMessages,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Page)
);
