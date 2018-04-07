import React from 'react';
import { css } from 'emotion';
import { Avatar } from 'antd';

const User = ({ withShortInfo }) => (
  <div className={styles.user}>
    <Avatar size="large" icon="user" />
    { withShortInfo && (
      <div className={styles.shortInfo}>
        <div>Luca Allievi</div>
        <strong>alliuca.com</strong>
      </div>
    ) }
  </div>
);

const styles = {
  user: css`
    text-align: center;
  `,
  shortInfo: css`
    display: inline-block;
    margin-left: 15px;
    vertical-align: middle;
    text-align: left;
  `,
};

export default User;
