/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
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

const button = (props: Props) =>
  css`
    width: ${props.width};
    height: ${props.height};
    background-color: ${props.background};
    color: ${props.color};
    border: ${props.border};
    font-size: ${props.size};
    border-radius: ${rem(5)};
    margin: ${props.margin};
    :hover {
      opacity: 80%;
      cursor: pointer;
    }
    :active {
      opacity: 95%;
    }
  `;

export const CommonButton = styled.button`
  ${button}
`;

export function Button({
  text,
  width,
  height,
  background,
  color,
  border,
  size,
  margin,
}: Props) {
  return (
    <CommonButton
      width={width}
      height={height}
      background={background}
      color={color}
      border={border}
      size={size}
      margin={margin}
    >
      {text}
    </CommonButton>
  );
}
