/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { color, rem } from '../common';
const like = css`
  color: ${color.point};
  font-size: ${rem(18)};
  width: ${rem(83)};
  height: ${rem(43.74)};
  border: 1px solid ${color.border};
  border-radius: ${rem(22)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

function LikeSymbol() {
  const LikeCount: number = 24;

  return (
    <div css={like}>
      <div>{`♡ ${LikeCount}`}</div>
    </div>
  );
}
export default LikeSymbol;
