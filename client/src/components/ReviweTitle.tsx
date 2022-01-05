/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { color, rem } from '../common';

const reviewDiv = css`
  font-size: 1rem;
  font-weight: 700;
  width: ${rem(265)};
  border-bottom: 1px solid ${color.valid};
  margin: 1.2rem 0;
`;

interface ReviewTitleStyle {
  text: string;
  fontSize?: number;
  width?: number;
}

function ReviewTitle(props: ReviewTitleStyle) {
  const { text, fontSize, width } = props;

  return (
    <div
      css={[
        reviewDiv,
        css`
          font-size: ${fontSize ? rem(fontSize) : null};
          width: ${width ? rem(width) : null};
        `,
      ]}
    >
      {text}
    </div>
  );
}

export default ReviewTitle;
