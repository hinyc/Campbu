/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { color, rem, relative, absolute } from '../common';

const gageStyle = css`
  border: 1px solid ${color.border};
  border-radius: ${rem(10)};
  height: ${rem(12)};
`;
const gageFillStyle = css`
  border: none;
  background-color: ${color.point};
  width: ${rem(100)};
`;
function Gage() {
  return (
    <div
      css={[
        relative,
        css`
          width: ${rem(265)};
          height: ${rem(12)};
        `,
      ]}
    >
      <div
        css={[
          gageStyle,
          absolute,
          css`
            bottom: 0;
            width: ${rem(265)};
          `,
        ]}
      ></div>
      <div
        css={[
          gageStyle,
          gageFillStyle,
          absolute,
          css`
            bottom: 0;
            width: ${rem(265 * 0.83)};
          `,
        ]}
      ></div>
    </div>
  );
}

export default Gage;
