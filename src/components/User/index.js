import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';
import { Container, ShortInfo } from './user.theme';

const User = ({ withShortInfo }) => (
  <Container>
    <Link to="/profile">
      <Avatar size="large" icon="user" />
    </Link>
    { withShortInfo && (
      <ShortInfo>
        <div>John Doe</div>
        <strong>doe.com</strong>
      </ShortInfo>
    ) }
  </Container>
);

export default User;
