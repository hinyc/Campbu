/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { color, rem, flex, textDecorationNone } from '../../common';
import ListTab from '../../components/ListTab';
import { Button } from '../../components/Button';
import emptyLend from '../../assets/pictures/emptyLend.svg';
import { Link } from 'react-router-dom';
import { link, visit } from './tab';
import Reservation from '../../components/Reservation';
import { container, section, message } from './tab';
import Complete from '../../components/Complete';
import YesOrNo from '../../components/YesOrNo';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Post, posts, Posts } from '../../Atom';

function LendList() {
  const lendLists = useRecoilValue<Posts>(posts);
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
        {/* //? 리스트가 하나도 없을 때
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
        /> */}
        {/* <Complete text="반납이 확인되었습니다" /> */}
        <YesOrNo
          text="취소"
          title="예약 취소"
          text1="예약을 취소하시겠습니까?"
          text2="대여자가 예약을 수락하기 전까지 취소할 수 있습니다."
        />
        <section css={section}>
          {lendLists['posts'].map((lendList: Post) => (
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
              reservation_dates={lendList.reservation_dates}
            />
            // <Reservation
            //   text="반납하기"
            //   background={`${color.point}`}
            //   color="white"
            //   cursor="pointer"
            //   hover="80%"
            //   postId={lendList.id}
            //   img_urls={lendList.img_urls}
            //   address={lendList.address}
            //   title={lendList.title}
            //   deposit={lendList.deposit}
            //   rental_fee={lendList.rental_fee}
            //   reservation_dates={['2022.01.01', '2022.01.02']}
            // />
            // <Reservation
            //   text="반납 확인 대기 중"
            //   background={`${color.point}`}
            //   opacity="50%"
            //   color="white"
            //   cursor="not-allowed"
            //   postId={lendList.id}
            //   img_urls={lendList.img_urls}
            //   address={lendList.address}
            //   title={lendList.title}
            //   deposit={lendList.deposit}
            //   rental_fee={lendList.rental_fee}
            //   reservation_dates={['2022.01.01', '2022.01.02']}
            // />
            // <Reservation
            //   text="반납완료"
            //   background={`${color.mid}`}
            //   color="white"
            //   cursor="default"
            //   postId={lendList.id}
            //   img_urls={lendList.img_urls}
            //   address={lendList.address}
            //   title={lendList.title}
            //   deposit={lendList.deposit}
            //   rental_fee={lendList.rental_fee}
            //   reservation_dates={['2022.01.01', '2022.01.02']}
            // />
          ))}
        </section>
      </div>
    </>
  );
}

export default LendList;
