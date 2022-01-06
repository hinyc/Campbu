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
  opacity?: string;
  hover?: string;
  cursor?: string;
  fontWeight?: number;
}

export const Button = (props: Props) => {
  const {
    text,
    width,
    height,
    background,
    color,
    border,
    size,
    margin,
    opacity,
    hover,
    cursor,
    fontWeight,
  } = props;
  return (
    <button
      css={css`
        width: ${width};
        height: ${height};
        background-color: ${background};
        color: ${color};
        border: ${border};
        font-size: ${size};
        font-weight: ${fontWeight ? fontWeight : null};
        border-radius: ${rem(5)};
        margin: ${margin};
        opacity: ${opacity};

        :hover {
          opacity: ${hover};
          cursor: ${cursor};
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
