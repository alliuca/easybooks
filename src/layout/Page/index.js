import React, { Component, createContext } from 'react';
import { connect } from 'react-redux';
import { setMessages } from 'actions/app';
import { Layout } from 'antd';
import { Wrapper } from './page.theme';
import Messages from 'components/Messages';
export const PageContext = createContext();

class Page extends Component {
  render() {
    const { children, messages, setMessages } = this.props;

    return (
      <PageContext.Provider value={{ setMessages }}>
        <Layout>
          <Wrapper>
            <Messages>{ messages }</Messages>
            { children }
          </Wrapper>
        </Layout>
      </PageContext.Provider>
    );
  }
}

const mapStateToProps = ({ app: { messages } }) => ({
  messages,
});

const mapDispatchToProps = {
  setMessages,
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
