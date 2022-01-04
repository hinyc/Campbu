import { css } from '@emotion/react';

const rootPixel: number = 16;

export const color = {
  point: '#ED662C',
  deep: '#395825',
  mid: '#609238',
  light: '#eeefcb',
  placeholder: '#c4c4c4',
  border: '#dedede',
  white: '#ffffff',
  valid: '#adadad',
};
export const rem = (px: number): string => `${px / rootPixel}rem`;
export const shadow = '0px 4px 10px rgba(0, 0, 0, 0.1)';
export const hover = '0px 4px 10px rgba(0, 0, 0, 0.25)';

export const relative = css`
  position: relative;
`;
export const absolute = css`
  position: absolute;
`;
export const confirm = css`
  background-color: #ffeaff;
`;
