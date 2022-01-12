/** @jsxImportSource @emotion/react */
import Reservation from '../../components/Reservation';
import { css } from '@emotion/react';
import { color, rem, flex, textDecorationNone } from '../../common';
import ListTab from '../../components/ListTab';
import { Link } from 'react-router-dom';
import { link, visit } from './tab';
import { Button } from '../../components/Button';
import emptyBorrow from '../../assets/pictures/emptyBorrow.svg';
import { container, section, message } from './tab';
import Complete from '../../components/Complete';
import { useRecoilState, useRecoilValue } from 'recoil';
import { borrows, UserPost } from '../../Atom';
import { useState } from 'react';
import YesOrNo from '../../components/YesOrNo';

interface Borrow {
  reservation: List[];
}

interface List {
  id: number;
  users_id: number;
  posts_id: number;
  reservation_dates: string[];
  reservation_status: number;
  posts: UserPost;
}

function BorrowList() {
  const [borrowLists, setBorrowLists] = useRecoilState<Borrow>(borrows);
  const [buttonClick, setButtonClick] = useState<boolean>(false);
  const onButtonClick = () => {
    setButtonClick(true);
  };
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
        <Link to="/lists/likelist" css={link}>
          찜한 목록
        </Link>
        <Link to="/lists/resistlist" css={link}>
          내가 쓴 글
        </Link>
      </nav>
      <div css={container}>
        {/* //? 리스트가 하나도 없을 때
        <img src={emptyBorrow} alt="camping" />
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
          cursor={'pointer'}
          hover="80%"
        /> */}
        {buttonClick ? (
          <YesOrNo
            //! reservation_status에 따라 버튼 text 바꾸기
            text="취소"
            title="예약 취소"
            text1="예약을 취소하시겠습니까?"
            text2="대여자가 예약을 수락하기 전까지 취소할 수 있습니다."
          />
        ) : null}
        <section css={section}>
          {borrowLists['reservation'].map((borrowList: List) => (
            <Reservation
              //! reservation_status에 따라 버튼 text 바꾸기
              text="예약 취소"
              background={`${color.point}`}
              color="white"
              cursor="pointer"
              hover="80%"
              postId={borrowList.posts.id}
              img_urls={borrowList.posts.img_urls}
              address={borrowList.posts.address}
              title={borrowList.posts.title}
              deposit={borrowList.posts.deposit}
              rental_fee={borrowList.posts.rental_fee}
              reservation_dates={borrowList.reservation_dates}
              onButtonClick={onButtonClick}
            />
          ))}
          {/* <Reservation
            text="반납하기"
            background={`${color.point}`}
            color="white"
            cursor="pointer"
            hover="80%"
            postId={borrowList.id}
            img_urls={borrowList.img_urls}
            address={borrowList.address}
            title={borrowList.title}
            deposit={borrowList.deposit}
            rental_fee={borrowList.rental_fee}
            reservation_dates={['2022.01.01', '2022.01.02']}
          />
          <Reservation
            text="반납 확인 대기 중"
            background={`${color.point}`}
            opacity="50%"
            color="white"
            cursor="not-allowed"
            postId={borrowList.id}
            img_urls={borrowList.img_urls}
            address={borrowList.address}
            title={borrowList.title}
            deposit={borrowList.deposit}
            rental_fee={borrowList.rental_fee}
            reservation_dates={['2022.01.01', '2022.01.02']}
          />
          <Reservation
            text="반납완료"
            background={`${color.mid}`}
            color="white"
            cursor="default"
            postId={borrowList.id}
            img_urls={borrowList.img_urls}
            address={borrowList.address}
            title={borrowList.title}
            deposit={borrowList.deposit}
            rental_fee={borrowList.rental_fee}
            reservation_dates={['2022.01.01', '2022.01.02']}
          /> */}
        </section>
      </div>
    </>
  );
}

export default BorrowList;
