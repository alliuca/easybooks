import React, { PureComponent } from 'react';
import { Route } from 'react-router-dom';
import { Container } from './layout.theme';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Message, setMessages } from 'actions/app';
import { RootState } from 'reducers';
import { Layout } from 'antd/lib';
import { Wrapper } from './layout.theme';
import MainSider from 'components/MainSider';
import Messages from 'components/Messages';
import { PageContext } from 'providers/Page/context';

interface Props {
  children: string | React.ReactNode;
  messages?: Message[];
  sider?: boolean;
}

class LayoutComponent extends PureComponent<Props> {
  static contextType = PageContext;
  
  render() {
    const { children, sider = true } = this.props;
    const { messages } = this.context;

    return (
      <Container>
        {sider && <MainSider />}
        <Layout>
          <Wrapper>
            <Messages>{messages}</Messages>
            {children}
          </Wrapper>
        </Layout>
      </Container>
    );
  }
};

export default LayoutComponent;
