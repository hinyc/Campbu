/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { color, rem, flex } from '../../common';
import ListTab from '../../components/ListTab';
import { Button } from '../../components/Button';
import emptyLend from '../../assets/pictures/emptyLend.svg';
import { Link } from 'react-router-dom';
import { link, visit } from './tab';
import Reservation from '../../components/Reservation';
import { container, section, message } from './tab';
import YesOrNo from '../../components/YesOrNo';
import { useRecoilState, useRecoilValue } from 'recoil';
import { lends, showConfirmModal } from '../../Atom';
import { useState } from 'react';

interface Lends {
  posts: Post[];
}

interface Post {
  id: number;
  category: string;
  deposit: number;
  rental_fee: number;
  unavailable_dates: string[];
  title: string;
  content: string;
  longitude: number;
  latitude: number;
  address: string;
  img_urls: string;
  users_id: number;
  likes_count: number;
  reservation: List[];
}

interface List {
  id: number;
  users_id: number;
  posts_id: number;
  reservation_dates: string[];
  reservation_status: number;
}

function LendList() {
  const lendLists = useRecoilValue<Lends>(lends);
  const [buttonClick, setButtonClick] = useRecoilState(showConfirmModal);
  const button = ['예약 수락', '반납 대기 중', '반납 확인', '회수 완료'];
  const title = ['예약 수락', '반납 확인'];
  const body1 = [
    `예약을 수락하시겠습니까?`,
    `대여자에게서 물품을 잘 받으셨나요?`,
  ];
  const body2 = [
    `예약 일정을 확인 후 수락 버튼을 눌러주세요.`,
    `반납 확인 시 회수 처리가 완료됩니다.`,
  ];
  const printStatusText = (status: number) => button[status - 1];
  const printTitleText = (status: number) => title[status - 1];
  const printBody1Text = (status: number) => body1[status - 1];
  const printBody2Text = (status: number) => body2[status - 1];

  const onButtonClick = () => {
    setButtonClick(true);
  };
  return (
    <>
      <ListTab />
      <nav css={[container, flex]}>
        <Link to="/lists/borrowlist" css={link}>
          빌린 목록
        </Link>
        <Link to="/lists/lendlist" css={[link, visit]}>
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
        {/* {buttonClick ? (
          <YesOrNo
            //! reservation_status에 따라 text 바꾸기
            text="취소"
            title="예약 취소"
            text1="예약을 취소하시겠습니까?"
            text2="대여자가 예약을 수락하기 전까지 취소할 수 있습니다."
          />
        ) : null} */}
        {lendLists['posts'].length === 0 ? (
          <>
            <img src={emptyLend} alt="camping" />
            <p css={message}>
              빌려준 목록이 없어요! <br />
              캠핑 용품이 있다면 대여 게시글을 올려보세요!
            </p>
            <Button
              text="캠핑 용품 보러 가기"
              width={`${rem(180)}`}
              height={`${rem(43)}`}
              background="white"
              color={`${color.mid}`}
              border={`1px solid ${color.mid}`}
              size={`${rem(14)}`}
            />
          </>
        ) : (
          <section css={section}>
            {lendLists['posts'].map((lendList: Post, index: number) => (
              <>
                <Reservation
                  key={index}
                  //! reservation index 번호는 유저 아이디에 맞는 예약 조회
                  text={printStatusText(
                    lendList.reservation[0].reservation_status,
                  )}
                  background={
                    lendList.reservation[0].reservation_status !== 4
                      ? `${color.point}`
                      : `${color.mid}`
                  }
                  color="white"
                  cursor={
                    lendList.reservation[0].reservation_status === 1 ||
                    lendList.reservation[0].reservation_status === 3
                      ? 'pointer'
                      : 'not-allowed'
                  }
                  hover={
                    lendList.reservation[0].reservation_status === 4
                      ? '100%'
                      : lendList.reservation[0].reservation_status === 2
                      ? '50%'
                      : '80%'
                  }
                  postId={lendList.id}
                  img_urls={lendList.img_urls}
                  address={lendList.address}
                  title={lendList.title}
                  deposit={lendList.deposit}
                  rental_fee={lendList.rental_fee}
                  reservation_dates={lendList.reservation[0].reservation_dates}
                  onButtonClick={onButtonClick}
                />
                {buttonClick && (
                  <YesOrNo
                    reservationId={lendList.reservation[0].id}
                    reservation_status={
                      lendList.reservation[0].reservation_status
                    }
                    text={printStatusText(
                      lendList.reservation[0].reservation_status,
                    )}
                    title={printTitleText(
                      lendList.reservation[0].reservation_status,
                    )}
                    text1={printBody1Text(
                      lendList.reservation[0].reservation_status,
                    )}
                    text2={printBody2Text(
                      lendList.reservation[0].reservation_status,
                    )}
                  />
                )}
              </>
            ))}
          </section>
        )}
      </div>
    </>
  );
}

export default LendList;
