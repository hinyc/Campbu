/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { color, rem, shadow, hover } from '../common';

const reviewDiv = css`
  font-size: 1rem;
  font-weight: 700;
  width: ${rem(290)};
  border-bottom: 1px solid ${color.valid};
  margin: 1.2rem 0;
`;

const reviewStyle = css`
  font-size: ${rem(14)};
  text-align: center;
  background-color: ${color.white};
  width: ${rem(204)};
  height: ${rem(46)};
  line-height: ${rem(46)};
  border: 1px solid black;
  border-radius: ${rem(49)};
  margin: ${rem(15)} 0 0 ${rem(30)};
`;
function ReviewBox() {
  const reviews: { id: number; review: string; count: number }[] = [
    { id: 1, review: '가격이 합리적이에요', count: 7 },
    { id: 2, review: '물건을 깨끗하게 사용했어요', count: 7 },
    { id: 3, review: '물건 질이 좋아요', count: 7 },
    { id: 4, review: '답장이 빨라요', count: 7 },
    { id: 7, review: '물건이 파손되어 있어요', count: 7 },
    { id: 8, review: '답장이 느려요', count: 7 },
  ];

  const title: string = '대여자에게 받은 좋은 리뷰';
  return (
    <div>
      <div css={[reviewDiv]}>좋은리뷰</div>
      {reviews.map((review) => {
        return review.id < 7 ? (
          <div key={review.id} css={reviewStyle}>
            {review.review}
          </div>
        ) : null;
      })}
    </div>
  );
}

export default ReviewBox;
