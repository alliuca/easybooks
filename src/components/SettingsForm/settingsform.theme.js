import styled from '@emotion/styled';
import { BlockPicker } from 'react-color';

export const Fields = styled('div')`
  margin-bottom: 30px;

  & > .ant-row {
    margin-bottom: 10px;
  }
`;

export const ColorPicker = styled(BlockPicker)`
  position: absolute !important;
  left: 50%;
  z-index: 1;
  margin: 5px auto 0;
  transform: translateX(-50%);
`;

export const Logo = styled('img')`
  max-width: 100%;
`;
