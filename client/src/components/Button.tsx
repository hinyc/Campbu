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
  onClick?: () => void;
  children?: React.ReactNode;
  shadow?: string;
  fontWeight?: number;
  hoverBackground?: string;
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
    children,
    shadow,
    fontWeight,
    hoverBackground,
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
        transition: 0.2s;
        :hover {
          opacity: ${hover};
          background-color: ${hoverBackground};
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
