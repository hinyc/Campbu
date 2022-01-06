/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { rem, shadow, hover, color } from '../common';

export const post = css`
  width: ${rem(235)};
  margin: 0 auto;
  border-radius: ${rem(15)};
  box-shadow: ${shadow};
  position: relative;
  :hover {
    box-shadow: ${hover};
  }
`;

export const img = css`
  width: ${rem(205)};
  height: ${rem(205)};
  object-fit: cover;
  border-radius: ${rem(10)};
  margin: ${rem(15)} ${rem(15)} ${rem(4)} ${rem(15)};
`;

export const textContainer = css`
  margin-left: ${rem(15)};
  margin-right: ${rem(15)};
`;

export const span = css`
  display: block;
  font-size: ${rem(16)};
  color: black;
  margin-bottom: ${rem(6)};
`;

export const address = css`
  display: inline-block;
  padding: ${rem(3)} ${rem(7)};
  font-size: ${rem(12)};
  border: 1px solid ${color.mid};
  border-radius: ${rem(50)};
`;

export const moneyTitle = css`
  color: ${color.mid};
  font-size: ${rem(14)};
`;
