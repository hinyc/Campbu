/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { rem, flex, shadow, hover, textDecorationNone, color } from '../common';
import Here from '../assets/Here.svg';
import { Button } from './Button';

const post = css`
  width: ${rem(235)};
  height: ${rem(445)};
  margin: 0 auto;
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
  border: 1px solid ${color.mid};
  border-radius: ${rem(50)};
`;

const moneyTitle = css`
  color: ${color.mid};
  font-size: ${rem(14)};
`;

function Reservation() {
  return (
    <div css={post}>
      <Link to="#" css={textDecorationNone}>
        <img
          src="https://paperbarkcamp.com.au/wp-content/uploads/2019/07/paperbark_flash-camp_news_1218x650.jpg"
          alt="product"
          css={img}
        />
        <div css={textContainer}>
          <span css={[span, moneyTitle, address]}>
            <img src={Here} alt="위치" style={{ marginRight: '4px' }} />
            용산구 이촌동
          </span>
          <span css={span}>3~4인용 텐트 빌려드려요</span>
          <div css={[flex, 'justify-content: space-between']}>
            <span>
              <div css={[span, moneyTitle]}>보증금</div>
              <div css={span}>20,000원</div>
            </span>
            <span>
              <div css={[span, moneyTitle]}>대여비</div>
              <div css={span}>20,000원</div>
            </span>
          </div>
          <div css={[span, moneyTitle]}>대여날짜</div>
          <div css={span}>2022.01.23 ~ 2022.01.24</div>
        </div>
      </Link>
      <Button
        text="예약완료"
        width={`${rem(205)}`}
        height={`${rem(40)}`}
        background="#ED662C"
        color="white"
        border="none"
        size={`${rem(14)}`}
        margin={`${rem(8)} 0 0 ${rem(15)}`}
      />
    </div>
  );
}

export default Reservation;
