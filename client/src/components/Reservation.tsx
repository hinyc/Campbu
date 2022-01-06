/** @jsxImportSource @emotion/react */
import { Link } from 'react-router-dom';
import { rem, textDecorationNone, flexBetween } from '../common';
import Here from '../assets/Here.svg';
import { Button } from './Button';
import { post, img, textContainer, span, address, moneyTitle } from './post';

interface Props {
  text: string;
  background: string;
  color: string;
  opacity?: string;
  cursor: string;
  hover?: string;
}

function Reservation(props: Props) {
  const { text, background, color, opacity, cursor, hover } = props;
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
          <div css={[span, moneyTitle]}>대여날짜</div>
          <div css={span}>2022.01.23 ~ 2022.01.24</div>
        </div>
      </Link>
      <Button
        text={text}
        width={`${rem(205)}`}
        height={`${rem(40)}`}
        background={background}
        color={color}
        border="none"
        size={`${rem(14)}`}
        margin={`${rem(8)} 0 ${rem(15)} ${rem(15)}`}
        opacity={opacity}
        cursor={cursor}
        hover={hover}
      />
    </div>
  );
}

export default Reservation;
