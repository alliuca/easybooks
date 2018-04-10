import React from 'react';
import { Spin, Icon } from 'antd';

const antIcon = <Icon type="loading" style={{ fontSize: 30 }} spin />;

const Spinner = () => (
  <Spin indicator={antIcon} />
);

export default Spinner;
