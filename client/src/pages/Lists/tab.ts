/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { rem, color } from '../../common';

export const link = css`
  color: ${color.placeholder};
  text-decoration: none;
  margin-left: ${rem(16)};
  margin-right: ${rem(41)};
  font-weight: 400;
  font-size: ${rem(16)};
  padding: 0 0 ${rem(6)} 0;

  :hover {
    color: ${color.deep};
    font-weight: 700;
    border-bottom: 2px solid ${color.deep};
  }
`;

export const visit = css`
  color: ${color.deep};
  font-weight: 700;
  border-bottom: 2px solid ${color.deep};
`;

export const container = css`
  width: ${rem(1280)};
  margin: 0 auto;
  margin-top: ${rem(36)};
  margin-bottom: ${rem(16)};
  text-align: center;
`;

export const section = css`
  text-align: left;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20%, auto));
  row-gap: ${rem(26)};
`;

export const message = css`
  font-size: ${rem(20)};
  color: ${color.mid};
  line-height: ${rem(28)};
  margin: ${rem(20)} 0;
`;
