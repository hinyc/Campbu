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
import { lends } from '../../Atom';
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
  const [buttonClick, setButtonClick] = useState<boolean>(false);
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
        {buttonClick ? (
          <YesOrNo
            //! reservation_status에 따라 text 바꾸기
            text="취소"
            title="예약 취소"
            text1="예약을 취소하시겠습니까?"
            text2="대여자가 예약을 수락하기 전까지 취소할 수 있습니다."
          />
        ) : null}
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
            {lendLists['posts'].map((lendList: Post) => (
              //! reservation_status에 따라 버튼 text 바꾸기
              <Reservation
                text="예약 취소"
                background={`${color.point}`}
                color="white"
                cursor="pointer"
                hover="80%"
                postId={lendList.id}
                img_urls={lendList.img_urls}
                address={lendList.address}
                title={lendList.title}
                deposit={lendList.deposit}
                rental_fee={lendList.rental_fee}
                reservation_dates={lendList.reservation[0].reservation_dates}
                onButtonClick={onButtonClick}
              />
            ))}
          </section>
        )}
        {/* <Reservation
              text="반납하기"
              background={`${color.point}`}
              color="white"
              cursor="pointer"
              hover="80%"
              postId={lendList.id}
              img_urls={lendList.img_urls}
              address={lendList.address}
              title={lendList.title}
              deposit={lendList.deposit}
              rental_fee={lendList.rental_fee}
              reservation_dates={['2022.01.01', '2022.01.02']}
            />
            <Reservation
              text="반납 확인 대기 중"
              background={`${color.point}`}
              opacity="50%"
              color="white"
              cursor="not-allowed"
              postId={lendList.id}
              img_urls={lendList.img_urls}
              address={lendList.address}
              title={lendList.title}
              deposit={lendList.deposit}
              rental_fee={lendList.rental_fee}
              reservation_dates={['2022.01.01', '2022.01.02']}
            />
            <Reservation
              text="반납완료"
              background={`${color.mid}`}
              color="white"
              cursor="default"
              postId={lendList.id}
              img_urls={lendList.img_urls}
              address={lendList.address}
              title={lendList.title}
              deposit={lendList.deposit}
              rental_fee={lendList.rental_fee}
              reservation_dates={['2022.01.01', '2022.01.02']}
            /> */}
      </div>
    </>
  );
}

export default LendList;
