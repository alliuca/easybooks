import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Message, setMessages } from 'actions/app';
import { RootState } from 'reducers';
import { Layout } from 'antd/lib';
import { Wrapper } from './page.theme';
import MainSider from 'components/MainSider';
import Messages from 'components/Messages';
import { Provider } from './context';

interface Props {
  children: string | React.Component;
  messages: Message[];
  setMessages: typeof setMessages;
  sider: boolean;
}

class Page extends Component<Props> {
  render() {
    const { children, messages, setMessages, sider = true } = this.props;

    return (
      <Provider value={{ setMessages }}>
        {sider && <MainSider />}
        <Layout>
          <Wrapper>
            <Messages>{messages}</Messages>
            {children}
          </Wrapper>
        </Layout>
      </Provider>
    );
  }
}

const mapStateToProps = ({ app: { messages } }: RootState) => ({
  messages,
});

const mapDispatchToProps = {
  setMessages,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);
