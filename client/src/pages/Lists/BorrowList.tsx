import Reservation from '../../components/Reservation';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { color, rem } from '../../common';
import ListTab from '../../components/ListTab';
import { Button } from '../../components/Button';
import emptyBorrow from '../../assets/pictures/emptyBorrow.svg';

const container = css`
  width: ${rem(1280)};
  margin: 0 auto;
  margin-top: ${rem(36)};
  margin-bottom: ${rem(16)};
  text-align: center;
`;

const section = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20%, auto));
  row-gap: ${rem(26)};
`;

const message = css`
  font-size: ${rem(20)};
  color: ${color.mid};
  line-height: ${rem(28)};
  margin: ${rem(20)} 0;
`;

const BorrowList = () => {
  return (
    <>
      <ListTab />
      <div css={container}>
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
        />
        {/* <section css={section}>
          <Reservation />
          <Reservation />
          <Reservation />
          <Reservation />
        </section> */}
      </div>
    </>
  );
};

export default BorrowList;
