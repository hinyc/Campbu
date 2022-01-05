/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { rem } from '../common';

interface Props {
  text?: string;
  width: string;
  height: string;
  background: string;
  color: string;
  border: string;
  size: string;
  margin?: string;
}

export const Button = (props: Props) => {
  const { text, width, height, background, color, border, size, margin } =
    props;
  return (
    <button
      css={css`
        width: ${width};
        height: ${height};
        background-color: ${background};
        color: ${color};
        border: ${border};
        font-size: ${size};
        border-radius: ${rem(5)};
        margin: ${margin};
        :hover {
          opacity: 80%;
          cursor: pointer;
        }
        :active {
          opacity: 95%;
        }
      `}
    >
      {text}
    </button>
  );
};
