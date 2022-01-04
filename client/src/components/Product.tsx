/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { rem, absolute } from '../common';
import { useState } from 'react';
import LikeSymbol from './LikeSymbol';

const post = css`
  width: ${rem(235)};
  height: ${rem(340)};
  border: 1px solid black;
  margin: 0 auto;
  position: relative;
`;

const img = css`
  width: ${rem(205)};
  height: ${rem(205)};
  object-fit: cover;
  border: 1px solid black;
  margin: 15px;
`;

const span = css`
  display: block;
  font-size: 0.875rem;
`;

const address = css`
  font-size: 0.5625rem;
`;

const moneyTitle = css`
  font-size: 0.69rem;
`;

const moneyDiv = css`
  display: flex;
`;

function Product() {
  return (
    <div css={post}>
      <a href="#">
        <img
          src="https://paperbarkcamp.com.au/wp-content/uploads/2019/07/paperbark_flash-camp_news_1218x650.jpg"
          alt="product"
          css={img}
        />
        <div
          css={[
            absolute,
            css`
              top: ${rem(23)};
              right: ${rem(23)};
            `,
          ]}
        >
          <LikeSymbol
            isFill={false}
            fontSize={13}
            count={17}
            width={46}
            height={24}
          />
        </div>
        <div>
          <span css={[span, address]}>용산구 이촌동</span>
          <span css={span}>3~4인용 텐트</span>
          <div css={moneyDiv}>
            <span>
              <div css={[span, moneyTitle]}>보증금</div>
              <div css={span}>20,000원</div>
            </span>
            <span>
              <div css={[span, moneyTitle]}>대여비</div>
              <div css={span}>20,000원</div>
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}

export default Product;
