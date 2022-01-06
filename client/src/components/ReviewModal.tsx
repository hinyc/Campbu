/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { color, rem, reviews, shadow } from '../common';
import { Button } from './Button';
import ReviewBox from './ReviewBox';

const background = css`
  margin: 50px;
  background-color: white;
  width: 30.687rem;
  height: 34.8125rem;
  border-radius: ${rem(15)};
  box-shadow: ${shadow};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: ${rem(12)};
`;
const reviewAlign = css`
  width: 23.1875rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0.625rem 0;
`;

const title = css`
  font-size: 1.25rem;
  margin: 0.375rem 0;
`;
const subTitle = css`
  font-size: 0.75rem;
  text-decoration: underline;
`;

function ReviewModal() {
  return (
    <div css={[background]}>
      <div css={title}>상대방과의 거래 어떠셧나요?</div>
      <div css={subTitle}>{`(1가지 이상 선택 필수)`}</div>
      <div>
        <div css={reviewAlign}>
          {reviews.map((review, idx) => {
            return review.id < 7 ? (
              <ReviewBox
                key={idx}
                content={review.review}
                isBad={false}
                width={180}
                isCenterText="center"
                margin={`0.5rem 0`}
                onClick={true}
              />
            ) : null;
          })}
        </div>
        <div
          css={[
            reviewAlign,
            css`
              border-top: 1px solid ${color.border};
            `,
          ]}
        >
          {reviews.map((review, idx) => {
            return review.id < 7 ? null : (
              <ReviewBox
                key={idx}
                content={review.review}
                isBad={true}
                width={180}
                isCenterText="center"
                margin={`0.5rem 0`}
                onClick={true}
              />
            );
          })}
        </div>
      </div>
      <div
        css={css`
          margin-top: 0.5rem;
        `}
      >
        <Button
          text="리뷰 등록"
          width={rem(180)}
          height={rem(43)}
          background={color.point}
          color={color.white}
          border="none"
          size={rem(14)}
        />
      </div>
    </div>
  );
}

export default ReviewModal;
