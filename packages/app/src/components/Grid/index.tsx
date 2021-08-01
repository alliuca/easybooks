import React from 'react';
import { Row as StyledRow, Col as StyledCol } from './grid.theme';
import { RowProps } from 'antd/lib/grid/row';
import { ColProps } from 'antd/lib/grid/col';

interface GridRowProps extends RowProps {
  margin?: string;
}
interface GridColProps extends ColProps {
  align?: 'left' | 'center' | 'right';
}

export const Row = (props: GridRowProps) => {
  return <StyledRow {...props}>{props.children}</StyledRow>;
};

export const Col = (props: GridColProps) => {
  return <StyledCol {...props}>{props.children}</StyledCol>;
};
