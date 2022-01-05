/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface ButtonProps {
  width: string;
  height: string;
  background: string;
  color: string;
  border: string;
  size: string;
  radius: string;
  margin: string;
  hoverOpacity: string;
  ActiveOpacity: string;
}

const button = (props: ButtonProps) =>
  css`
    width: ${props.width};
    height: ${props.height};
    background-color: ${props.background};
    color: ${props.color};
    border: ${props.border};
    font-size: ${props.size};
    border-radius: ${props.radius};
    margin: ${props.margin};
    :hover {
      opacity: ${props.hoverOpacity};
      cursor: pointer;
    }
    :active {
      opacity: ${props.ActiveOpacity};
    }
  `;

export const CommonButton = styled.button`
  ${button}
`;

interface Props {
  text: string;
  width: string;
  height: string;
  background: string;
  color: string;
  border: string;
  size: string;
  radius: string;
  margin: string;
  hoverOpacity: string;
  ActiveOpacity: string;
}

export function Button({
  text,
  width,
  height,
  background,
  color,
  border,
  size,
  radius,
  margin,
  hoverOpacity,
  ActiveOpacity,
}: Props) {
  return (
    <CommonButton
      width={width}
      height={height}
      background={background}
      color={color}
      border={border}
      size={size}
      radius={radius}
      margin={margin}
      hoverOpacity={hoverOpacity}
      ActiveOpacity={ActiveOpacity}
    >
      {text}
    </CommonButton>
  );
}
