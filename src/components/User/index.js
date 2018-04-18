import React from 'react';
import { Avatar } from 'antd';
import { Container, ShortInfo } from './user.theme';

const User = ({ withShortInfo }) => (
  <Container>
    <Avatar size="large" icon="user" />
    { withShortInfo && (
      <ShortInfo>
        <div>John Doe</div>
        <strong>doe.com</strong>
      </ShortInfo>
    ) }
  </Container>
);

export default User;
