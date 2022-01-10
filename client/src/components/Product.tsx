/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  rem,
  absolute,
  flexBetween,
  textDecorationNone,
  host,
} from '../common';
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
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { isLogin } from '../Atom';
import { useState } from 'react';

interface Props {
  isFill: boolean;
  display?: string;
  img_urls: string;
  address: string;
  title: string;
  deposit: number;
  rental_fee: number;
  count: number;
  postId: number;
  setModalShow: any;
}

function Product(props: Props) {
  const {
    isFill,
    display,
    img_urls,
    address,
    title,
    deposit,
    rental_fee,
    count,
    postId,
    setModalShow,
  } = props;

  const [countHeart, setCountHeart] = useState<number>(count);
  const [fillHeart, setFillHeart] = useState<boolean>(isFill);
  const HeartClickPOST = () => {
    // axios
    //   .post(
    //     `${host}/user/like`,
    //     { post_id: postId },
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     },
    //   )
    //   .then((res) => {
    //     if (res.status === 201) {
    if (fillHeart) {
      console.log('cancel post [liked]!');
      setCountHeart(count - 1);
    } else {
      console.log('add post [liked]!');
      setCountHeart(countHeart + 1);
    }
    setFillHeart(!fillHeart);
    // } else if (res.status === 401) {
    //   console.log('Unauthorized User');
    //   setModalShow(true);
    // }
    // });
  };

  return (
    <div css={post}>
      <div
        css={[
          absolute,
          css`
            top: ${rem(23)};
            right: ${rem(23)};
          `,
        ]}
      >
        <div onClick={HeartClickPOST}>
          <LikeSymbol
            fillHeart={fillHeart}
            countHeart={countHeart}
            isFill={isFill}
            fontSize={13}
            count={count}
            width={46}
            height={24}
            display={display}
          />
        </div>
      </div>
      <Link to={`${postId}`} css={textDecorationNone}>
        <img src={img_urls} alt="product" css={img} />
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
      </Link>
    </div>
  );
}

export default Product;
