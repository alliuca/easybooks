import React from 'react';
import { Tag } from 'antd';
import Text from 'components/Text';

interface Props {
  color: string;
  children: React.ReactNode;
}

const statusColors: { [key: string]: string } = {
  Paid: 'green',
  Waiting: 'volcano',
};

const TagComponent: React.FunctionComponent<Props> = ({ color = 'geekblue', children }) => {
  return (
    <Tag color={statusColors.hasOwnProperty(color) ? statusColors[color] : color}>
      <Text textTransform="uppercase">{children}</Text>
    </Tag>
  );
};

export default TagComponent;
