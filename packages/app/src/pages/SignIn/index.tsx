import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { PageContext } from 'providers/Page/context';
import { RootState } from 'reducers';
import { AppState } from 'reducers/app';
import { login, LoginData } from 'actions/app';
import Layout from 'components/Layout';
import LoginForm from 'components/LoginForm';

export interface Props extends AppState, RouteComponentProps {
  login: (data: LoginData) => ReturnType<ReturnType<typeof login>>;
}

class SignIn extends Component<Props> {
  static contextType = PageContext;

  handleLogin = async (obj: LoginData) => {
    const {
      location: { state },
    } = this.props;
    await this.props.login(obj);
    // @ts-ignore
    if (state && state.from) return this.context.goTo(state.from.pathname);
    return this.context.goTo('/');
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

const mapStateToProps = ({ app: { loggedIn } }: RootState) => ({
  loggedIn,
});

const mapDispatchToProps = {
  login,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
