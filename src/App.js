import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from 'pages/Home';
import Invoices from 'pages/Invoices';
import Invoice from 'pages/Invoice';
import Settings from 'pages/Settings';
import Profile from 'pages/Profile';
import Layout from 'components/Layout';
import MainSider from 'components/MainSider';
const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Layout>
            <MainSider />
            <Route exact path="/" component={Home} />
            <Route exact path="/invoices" component={Invoices} />
            <Route path="/invoice/:number" component={Invoice} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/profile" component={Profile} />
          </Layout>
        </Router>
      </Provider>
    );
  }
}

export default App;
