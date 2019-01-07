import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';
import { baseURL } from 'config';
import { Container, ShortInfo } from './user.theme';

const User = ({ data: { logo, name, website }, withShortInfo }) => (
  <Container>
    <Link to="/profile">
      <Avatar size="large" icon={!logo ? 'user' : null} src={logo ? `${baseURL}/files/upload/logo/${logo.file.name}` : null} />
    </Link>
    { withShortInfo && (
      <ShortInfo>
        <div>{name || 'John Doe'}</div>
        <strong>{website || 'doe.com'}</strong>
      </ShortInfo>
    ) }
  </Container>
);

export default User;
