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
import YesOrNo from '../../components/ConfirmLend';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  lends,
  showCompleteModal,
  showConfirmModal,
  showReviewModal,
} from '../../Atom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { host } from '../../common';
import Complete from '../../components/Complete';
import ReviewModal from '../../components/ReviewModal';

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
  const [lendLists, setLendLists] = useRecoilState<Lends>(lends);
  const [confirm, setConfirm] = useRecoilState(showConfirmModal);
  const [complete, setComplete] = useRecoilState(showCompleteModal);
  const [review, setReview] = useRecoilState(showReviewModal);
  const [reservationId, setReservationId] = useState(0);
  const [reservationStatus, setReservationStatus] = useState(0);
  const [userId, setUserId] = useState(0);
  const button = ['예약 수락', '반납 대기 중', '반납 확인', '회수 완료'];
  const printStatusText = (status: number) => button[status - 1];
  const onButtonClick = (id: number, status: number, userId: number) => {
    setReservationId(id);
    setReservationStatus(status);
    setUserId(userId);
    setConfirm(true);
  };

  const onCompleteClick = () => {
    setComplete(false);
    if (reservationStatus === 3) {
      setReview(true);
    }
  };

  // useEffect(() => {
  //   axios
  //     .get(`${host}/userinfo/product/lend`)
  //     .then((res) => {
  //       console.log(res.data);
  //       setLendLists(res.data);
  //     })
  //     .catch((err) => console.error(err));
  // });

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
          내가 쓴 글{' '}
        </Link>
      </nav>
      <div css={container}>
        {confirm &&
          ((reservationStatus === 1 && (
            <YesOrNo
              reservationId={reservationId}
              reservation_status={1}
              text={'예약 수락'}
              title={'예약 수락'}
              text1={`예약을 수락하시겠습니까?`}
              text2={`예약 일정 확인 후 수락 버튼을 눌러주세요.`}
            />
          )) ||
            (reservationStatus === 3 && (
              <YesOrNo
                reservationId={reservationId}
                reservation_status={3}
                text={'반납 확인'}
                title={'반납 확인'}
                text1={`대여자에게서 물품을 잘 받으셨나요?`}
                text2={`반납 확인 시 회수 처리가 완료됩니다.`}
              />
            )))}
        {complete &&
          (reservationStatus === 1 ? (
            <Complete text="예약이 수락되었습니다" onClick={onCompleteClick} />
          ) : (
            <Complete text="반납이 확인되었습니다" onClick={onCompleteClick} />
          ))}
        {review && <ReviewModal userId={userId} />}
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
                opacity={
                  lendList.reservation[0].reservation_status === 2
                    ? '50%'
                    : '100%'
                }
                postId={lendList.id}
                img_urls={lendList.img_urls}
                address={lendList.address}
                title={lendList.title}
                deposit={lendList.deposit}
                rental_fee={lendList.rental_fee}
                reservation_dates={lendList.reservation[0].reservation_dates}
                onButtonClick={() =>
                  onButtonClick(
                    lendList.id,
                    lendList.reservation[0].reservation_status,
                    lendList.reservation[0].users_id,
                  )
                }
              />
            ))}
          </section>
        )}
      </div>
    </>
  );
}

export default LendList;
