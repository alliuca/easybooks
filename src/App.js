import React, { Component } from 'react';
import { css } from 'emotion';
import { Layout } from 'antd';
import MainSider from './components/MainSider';
const { Content } = Layout;

class App extends Component {
  render() {
    return (
      <div>
        <Layout className={styles.layout}>
          <MainSider />
          <Layout>
            <Content className={styles.content}>Content</Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

const styles = {
  layout: css`
    height: 100%;
  `,
  content: css`
    padding: 50px;
  `,
};

export default App;
