import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { css } from 'emotion';
import { Layout } from 'antd';
import Home from './pages/Home';
import Invoices from './pages/Invoices';
import Invoice from './pages/Invoice';
import MainSider from './components/MainSider';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Layout className={styles.layout}>
            <MainSider />
            <Route exact path="/" component={Home} />
            <Route exact path="/invoices" component={Invoices} />
            <Route path="/invoices/:number" component={Invoice} />
          </Layout>
        </div>
      </Router>
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
