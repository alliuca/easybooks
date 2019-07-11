import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Divider } from 'antd';
import { fetchSettings } from 'actions/app';
import { fetchProfile } from 'actions/profile';
import { RootState } from 'reducers';
import { Container, Top } from './mainsider.theme';
import User, { Props as UserProps } from 'components/User';
import MainMenu from 'components/MainMenu';

type User = UserProps['data'];

interface Props extends User {
  fetchSettings: () => ReturnType<ReturnType<typeof fetchSettings>>;
  fetchProfile: () => ReturnType<ReturnType<typeof fetchProfile>>;
}

class MainSider extends Component<Props> {
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
}: RootState) => ({
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
