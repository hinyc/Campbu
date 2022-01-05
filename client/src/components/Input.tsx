/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { color, rem } from '../common';

const inputStyle = css`
  border: 1px solid ${color.border};
  padding: 0.75rem;
  ::placeholder {
    color: ${color.placeholder};
  }
`;

interface InputProps {
  width: number;
  height: number;
  type?: string;
  fontSize?: number;
  borderStyle?: string;
  borderRadius?: number;
  placeholder?: string;
}
export default function Input(props: InputProps) {
  const {
    width,
    height,
    type,
    fontSize,
    borderStyle,
    borderRadius,
    placeholder,
  } = props;
  return (
    <input
      css={[
        inputStyle,
        css`
          width: ${rem(width)};
          height: ${rem(height)};
          font-size: ${fontSize ? rem(fontSize) : `1rem`};
          border-radius: ${borderRadius ? rem(borderRadius) : null};
          border-style: ${borderStyle ? borderStyle : null};
          ::placeholder {
            color: ${color.placeholder};
          }
        `,
      ]}
      type={type ? type : 'text'}
      placeholder={placeholder ? placeholder : undefined}
    />
  );
}
