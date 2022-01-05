/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { color, rem } from '../common';

const reviewStyle = css`
  font-size: ${rem(14)};
  text-align: center;
  background-color: ${color.white};
  width: 16.5625rem;
  height: ${rem(43)};
  line-height: ${rem(46)};
  color: ${color.mid};
  border: 1px solid ${color.mid};
  border-radius: 0.3125rem;
  margin: ${rem(10)} 0;
  display: flex;
  justify-content: space-between;
`;

const contentStyle = css`
  margin-left: 1.2rem;
`;
const countStyle = css`
  font-weight: 700;
  margin-right: 1.2rem;
`;

interface ReviewContent {
  content: string;
  count: number;
  fontSize?: number;
  width?: number;
  height?: number;
  isBad: boolean;
}

function ReviewBox(props: ReviewContent) {
  const { content, count, fontSize, width, height, isBad } = props;
  return (
    <div
      css={[
        reviewStyle,
        css`
          font-size: ${fontSize ? rem(fontSize) : null};
          width: ${width ? rem(width) : null};
          height: ${height ? rem(height) : null};
          color: ${isBad ? color.deep : null};
          border-color: ${isBad ? color.deep : null};
        `,
      ]}
    >
      <div
        css={[
          contentStyle,
          css`
            margin-left: ${width ? rem(width * 0.075) : null};
          `,
        ]}
      >
        {content}
      </div>
      <div
        css={[
          countStyle,
          css`
            margin-right: ${width ? rem(width * 0.075) : null};
          `,
        ]}
      >{`+${count}`}</div>
    </div>
  );
}

export default ReviewBox;
