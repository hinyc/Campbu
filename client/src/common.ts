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
export const flex = css`
  display: flex;
`;
export const textDecorationNone = css`
  text-decoration: none;
`;
export const flexBetween = css`
  display: flex;
  justify-content: space-between;
`;
export const flexVertical = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const reviews: { id: number; review: string }[] = [
  { id: 1, review: '가까운 거래장소' },
  { id: 2, review: '상세한 물품 설명' },
  { id: 3, review: '합리적인 대여비' },
  { id: 4, review: '질 좋은 물건' },
  { id: 5, review: '정확한 시간 약속' },
  { id: 6, review: '빠른 답장' },
  { id: 7, review: '욕설 등의 비매너' },
  { id: 8, review: '실제와 다른 상품 설명' },
  { id: 9, review: '비싼 대여비' },
  { id: 10, review: '질 낮은 물건' },
  { id: 11, review: '약속 시간에 지각' },
  { id: 12, review: '느린 답장' },
];
