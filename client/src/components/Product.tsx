/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { rem, absolute, shadow, hover, color, flexBetween } from '../common';
import LikeSymbol from './LikeSymbol';
import Here from '../assets/Here.svg';

const post = css`
  width: ${rem(235)};
  height: ${rem(340)};
  margin: 0 auto;
  position: relative;
  border-radius: ${rem(15)};
  box-shadow: ${shadow};
  :hover {
    box-shadow: ${hover};
  }
`;

const img = css`
  width: ${rem(205)};
  height: ${rem(205)};
  object-fit: cover;
  border-radius: ${rem(10)};
  margin: ${rem(15)} ${rem(15)} ${rem(4)} ${rem(15)};
`;

const textContainer = css`
  margin-left: ${rem(15)};
  margin-right: ${rem(15)};
`;

const span = css`
  display: block;
  font-size: ${rem(16)};
  color: black;
  margin-bottom: ${rem(6)};
`;

const address = css`
  width: ${rem(96)};
  padding: ${rem(3)} ${rem(7)};
  font-size: ${rem(12)};
  color: ${color.mid};
  border: 1px solid ${color.mid};
  border-radius: ${rem(50)};
`;

const moneyTitle = css`
  color: ${color.mid};
  font-size: ${rem(14)};
`;

function Product() {
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
          isFill={false}
          fontSize={13}
          count={17}
          width={46}
          height={24}
        />
      </div>
      <div css={textContainer}>
        <span css={[span, address]}>
          <img src={Here} alt="위치" style={{ marginRight: '4px' }} />
          용산구 이촌동
        </span>
        <span css={span}>3~4인용 텐트</span>
        <div css={flexBetween}>
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
    </div>
  );
}

export default Product;
