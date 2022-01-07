/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { rem, absolute, flexBetween } from '../common';
import LikeSymbol from './LikeSymbol';
import Here from '../assets/Here.svg';
import {
  post,
  img,
  textContainer,
  span,
  addressStyle,
  moneyTitle,
} from './post';

interface Props {
  isFill: boolean;
  display?: string;
  img_urls: string;
  address: string;
  title: string;
  deposit: number;
  rental_fee: number;
}

function Product(props: Props) {
  const { isFill, display, img_urls, address, title, deposit, rental_fee } =
    props;
  return (
    <div css={post}>
      <img src={img_urls} alt="product" css={img} />
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
        <span css={[span, moneyTitle, addressStyle]}>
          <img src={Here} alt="위치" style={{ marginRight: '4px' }} />
          {address}
        </span>
        <span css={span}>{title}</span>
        <div css={flexBetween}>
          <span>
            <div css={[span, moneyTitle]}>보증금</div>
            <div css={[span, `margin-bottom: ${rem(15)}`]}>{deposit}원</div>
          </span>
          <span>
            <div css={[span, moneyTitle]}>대여비</div>
            <div css={span}>{rental_fee}원</div>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Product;
