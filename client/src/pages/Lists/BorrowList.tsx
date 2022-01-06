/** @jsxImportSource @emotion/react */
import Reservation from '../../components/Reservation';
import { css } from '@emotion/react';
import { color, rem, flex } from '../../common';
import ListTab from '../../components/ListTab';
import { Link } from 'react-router-dom';
import { link, visit } from './tab';
import Reservation from '../../components/Reservation';
import { Button } from '../../components/Button';
import emptyBorrow from '../../assets/pictures/emptyBorrow.svg';
import { container, section, message } from './tab';

const BorrowList = () => {
  return (
    <>
      <ListTab />
      <nav css={[container, flex]}>
        <Link to="/lists/borrowlist" css={[link, visit]}>
          빌린 목록
        </Link>
        <Link to="/lists/lendlist" css={link}>
          빌려준 목록
        </Link>
        <Link to="/lists/resistlist" css={link}>
          내가 쓴 글
        </Link>
        <Link to="/lists/likelist" css={link}>
          찜한 목록
        </Link>
      </nav>
      <div css={container}>
        {/* <img src={emptyBorrow} alt="camping" />
        <p css={message}>
          빌린 목록이 없어요! <br />
          캠핑용품을 대여해서 즐거운 캠핑을 떠나보세요!
        </p>
        <Button
          text="캠핑 용품 보러 가기"
          width={`${rem(180)}`}
          height={`${rem(43)}`}
          background="white"
          color={`${color.mid}`}
          border={`1px solid ${color.mid}`}
          size={`${rem(14)}`}
        /> */}
        <section css={section}>
          <Reservation
            text="예약 취소"
            background={`${color.point}`}
            color="white"
            cursor="pointer"
            hover="80%"
          />
          <Reservation
            text="반납하기"
            background={`${color.point}`}
            color="white"
            cursor="pointer"
            hover="80%"
          />
          <Reservation
            text="반납 확인 대기 중"
            background={`${color.point}`}
            opacity="50%"
            color="white"
            cursor="not-allowed"
          />
          <Reservation
            text="반납완료"
            background={`${color.mid}`}
            color="white"
            cursor="default"
          />
        </section>
      </div>
    </>
  );
};

export default BorrowList;
