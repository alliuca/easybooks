import React, { Component, createContext } from 'react';
import { connect } from 'react-redux';
import { setMessages } from 'actions/app';
import { Layout } from 'antd';
import { Wrapper } from './page.theme';
import MainSider from 'components/MainSider';
import Messages from 'components/Messages';
export const PageContext = createContext();

class Page extends Component {
  render() {
    const { children, messages, setMessages, sider } = this.props;

    return (
      <PageContext.Provider value={{ setMessages }}>
        {sider && <MainSider />}
        <Layout>
          <Wrapper>
            <Messages>{messages}</Messages>
            {children}
          </Wrapper>
        </Layout>
      </PageContext.Provider>
    );
  }
}

Page.defaultProps = {
  sider: true,
};

const mapStateToProps = ({ app: { messages } }) => ({
  messages,
});

const mapDispatchToProps = {
  setMessages,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);
