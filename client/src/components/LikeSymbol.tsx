/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { color, rem, shadow, hover } from '../common';

const LikeCount: number = 24;
function LikeSymbol() {
  return (
    <div>
      <div>{`♡ ${LikeCount}`}</div>
    </div>
  );
}
export default LikeSymbol;
