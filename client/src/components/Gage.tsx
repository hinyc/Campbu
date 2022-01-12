/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { color, rem, relative, absolute } from '../common';

const gageStyle = css`
  border: 1px solid ${color.border};
  border-radius: ${rem(10)};
`;
const gageFillStyle = css`
  border: none;
  background-color: ${color.point};
`;

interface GageProps {
  width?: number | undefined;
  height?: number | undefined;
  ratio: number;
}

function Gage(props: GageProps) {
  const { width, height, ratio } = props;
  return (
    <div
      css={[
        relative,
        css`
          width: ${width ? rem(width) : rem(265)};
          height: ${height ? rem(height) : rem(12)};
        `,
      ]}
    >
      <div
        css={[
          gageStyle,
          absolute,
          css`
            bottom: 0;
            width: ${width ? rem(width) : rem(265)};
            height: ${height ? rem(height) : rem(12)};
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
            width: ${width ? rem(width * ratio) : rem(265 * ratio)};
            height: ${height ? rem(height) : rem(12)};
          `,
        ]}
      ></div>
    </div>
  );
}

export default Gage;
