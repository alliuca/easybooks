import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSettings } from 'actions/app';
import { fetchProfile } from 'actions/profile';
import { Divider } from 'antd';
import { Container, Top } from './mainsider.theme';
import User from 'components/User';
import MainMenu from 'components/MainMenu';

class MainSider extends Component {
  componentDidMount() {
    this.props.fetchSettings();
    this.props.fetchProfile();
  }

  render() {
    const { logo, name, website } = this.props;

    return (
      <Container width={200}>
        <Top>
          <User data={{ logo, name, website }} withShortInfo />
          <Divider />
        </Top>
        <MainMenu />
      </Container>
    );
  }
}

const mapStateToProps = ({
  app: {
    settings: { logo },
  },
  profile: { name, website },
}) => ({
  logo,
  name,
  website,
});

const mapDispatchToProps = {
  fetchSettings,
  fetchProfile,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainSider);
