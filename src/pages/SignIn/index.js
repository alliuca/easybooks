import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from 'actions/app';
import Layout from 'components/Layout';
import LoginForm from 'components/LoginForm';

class SignIn extends Component {
  handleLogin = async obj => {
    const {
      location: { state },
      history,
    } = this.props;
    await this.props.login(obj);
    if (state && state.from) return history.push(state.from.pathname);
    return history.push('/');
  };

  render() {
    const { loggedIn } = this.props;

    return (
      <Layout sider={false}>
        <LoginForm login={this.handleLogin} loggedIn={loggedIn} />
      </Layout>
    );
  }
}

const mapStateToProps = ({ app: { loggedIn } }) => ({
  loggedIn,
});

const mapDispatchToProps = {
  login,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
