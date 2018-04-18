import React from 'react';
import { Divider } from 'antd';
import { Container, Top } from './mainsider.theme';
import User from 'components/User';
import MainMenu from 'components/MainMenu';

const MainSider = () => (
  <Container width={200}>
    <Top>
      <User withShortInfo />
      <Divider />
    </Top>
    <MainMenu />
  </Container>
);

export default MainSider;
