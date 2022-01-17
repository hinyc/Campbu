/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { color, rem } from '../common';
import { useState } from 'react';

const reviewStyle = css`
  font-size: ${rem(14)};
  text-align: center;
  background-color: ${color.white};
  width: 16.5625rem;
  height: ${rem(43)};
  line-height: ${rem(43)};
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
  count?: number;
  fontSize?: number;
  width?: number;
  height?: number;
  isBad: boolean;
  isCenterText?: string;
  margin?: string;
  fontColor: string;
  borderColor: string;
  onClick?: any;
}

function ReviewBox(props: ReviewContent) {
  const [click, setClick] = useState(false);
  const {
    content,
    count,
    fontSize,
    width,
    height,
    isBad,
    isCenterText,
    margin,
    fontColor,
    borderColor,
    onClick,
  } = props;

  const clickHandler = () => {
    setClick(!click);
  };

  return (
    <div
      onClick={() => {
        clickHandler();
        onClick();
      }}
      css={[
        reviewStyle,
        css`
          font-size: ${fontSize ? rem(fontSize) : null};
          width: ${width ? rem(width) : null};
          height: ${height ? rem(height) : null};
          line-height: ${height ? rem(height) : null};
          color: ${click ? color.white : count ? fontColor : color.placeholder};
          border-color: ${count ? borderColor : color.border};
          margin: ${margin ? margin : null};
          background-color: ${click ? (isBad ? color.deep : color.mid) : null};
          :hover {
            cursor: pointer;
          }
          :active {
            opacity: '80%';
          }
        `,
      ]}
    >
      {isCenterText ? (
        <div
          css={css`
            margin: 0 auto;
          `}
        >
          {content}
        </div>
      ) : (
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
      )}
      {count ? (
        <div
          css={[
            countStyle,
            css`
              margin-right: ${width ? rem(width * 0.075) : null};
            `,
          ]}
        >{`+${count}`}</div>
      ) : (
        <div
          css={[
            countStyle,
            css`
              margin-right: ${width ? rem(width * 0.075) : null};
              font-size: ${rem(20)};
            `,
          ]}
        >
          {/* ✔ */}✓
        </div>
      )}
    </div>
  );
}

export default ReviewBox;
