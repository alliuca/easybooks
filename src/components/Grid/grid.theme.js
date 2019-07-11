import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Row as AntdRow, Col as AntdCol } from 'antd';

export const Row = styled(AntdRow)(
  ({ margin }) => css`
    margin: ${margin};
  `
);

export const Col = styled(AntdCol)``;
