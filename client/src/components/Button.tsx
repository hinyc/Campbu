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
  onClick?: any;
  weight?: number;
  children?: React.ReactNode;
  shadow?: string;
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
    onClick,
    weight,
    children,
    shadow,
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
        border-radius: ${rem(5)};
        margin: ${margin};
        opacity: ${opacity};
        font-weight: ${weight};
        :hover {
          opacity: ${hover};
          cursor: ${cursor};
          box-shadow: ${shadow};
        }
        :active {
          opacity: 95%;
        }
      `}
      onClick={onClick}
    >
      {text}
      {children}
    </button>
  );
};
