import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Divider } from 'antd';
import { Container, Top } from './mainsider.theme';
import User from 'components/User';
import MainMenu from 'components/MainMenu';

class MainSider extends Component {
  render() {
    const { name, website } = this.props;

    return (
      <Container width={200}>
        <Top>
          <User data={{ name, website }} withShortInfo />
          <Divider />
        </Top>
        <MainMenu />
      </Container>
    );
  }
}

const mapStateToProps = ({ profile: { name, website } }) => ({
  name,
  website,
});

export default connect(mapStateToProps)(MainSider);
