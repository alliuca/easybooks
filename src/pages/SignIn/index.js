import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from 'actions/app';
import Page from 'layout/Page';
import LoginForm from 'components/LoginForm';

class SignIn extends Component {
  handleLogin = (obj) => {
    this.props.login(obj);
  }

  render() {
    const { loggedIn } = this.props;

    return (
      <Page sider={false}>
        <LoginForm
          login={this.handleLogin}
          loggedIn={loggedIn}
        />
      </Page>
    );
  }
}

const mapStateToProps = ({ app: { loggedIn } }) => ({
  loggedIn,
});

const mapDispatchToProps = {
  login,
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
