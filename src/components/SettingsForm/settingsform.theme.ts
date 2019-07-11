import styled from '@emotion/styled';
import { BlockPicker } from 'react-color';

export const ColorPicker = styled(BlockPicker)`
  position: absolute !important;
  right: 0;
  z-index: 1;
  margin: 5px auto 0;
`;

export const Logo = styled('img')`
  max-width: 100%;
`;
