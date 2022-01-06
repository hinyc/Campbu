/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { rem, absolute, flexBetween } from '../common';
import LikeSymbol from './LikeSymbol';
import Here from '../assets/Here.svg';
import { post, img, textContainer, span, address, moneyTitle } from './post';

interface Props {
  isFill: boolean;
  display?: string;
}

function Product({ isFill, display }: Props) {
  return (
    <div css={post}>
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
          isFill={isFill}
          fontSize={13}
          count={17}
          width={46}
          height={24}
          display={display}
        />
      </div>
      <div css={textContainer}>
        <span css={[span, moneyTitle, address]}>
          <img src={Here} alt="위치" style={{ marginRight: '4px' }} />
          용산구 이촌동
        </span>
        <span css={span}>3~4인용 텐트</span>
        <div css={flexBetween}>
          <span>
            <div css={[span, moneyTitle]}>보증금</div>
            <div css={[span, `margin-bottom: ${rem(15)}`]}>20,000원</div>
          </span>
          <span>
            <div css={[span, moneyTitle]}>대여비</div>
            <div css={span}>20,000원</div>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Product;
