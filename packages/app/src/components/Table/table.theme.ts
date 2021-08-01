import styled from '@emotion/styled';
import { css } from '@emotion/core';

export const Cell = styled('div')<{ editable: boolean }>(
  ({ editable }) => css`
    ${editable &&
      css`
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        padding: 4px 11px 5px;
        transition: all 0.3s;
        cursor: text;

        &:hover {
          border-color: #40a9ff;
        }
      `};
  `
);
