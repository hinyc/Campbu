/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { color, rem, flex } from '../../common';
import ListTab from '../../components/ListTab';
import { Button } from '../../components/Button';
import emptyHeart from '../../assets/pictures/emptyHeart.svg';
import { Link } from 'react-router-dom';
import { link, visit } from './tab';
import { container, section, message } from './tab';
import Product from '../../components/Product';

const img = css`
  margin-top: ${rem(51)};
`;

function LikeList() {
  return (
    <>
      <ListTab />
      <nav css={[container, flex]}>
        <Link to="/lists/borrowlist" css={link}>
          빌린 목록
        </Link>
        <Link to="/lists/lendlist" css={link}>
          빌려준 목록
        </Link>
        <Link to="/lists/resistlist" css={link}>
          내가 쓴 글
        </Link>
        <Link to="/lists/likelist" css={[link, visit]}>
          찜한 목록
        </Link>
      </nav>
      <div css={container}>
        {/* //? 리스트가 하나도 없을 때
        <img src={emptyHeart} alt="broken heart" css={img} />
        <p css={message}>
          찜한 목록이 없어요! <br />
          마음에 드는 캠핑용품을 찜하고 캠핑을 떠나보세요!
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
        <section css={section}>
          <Product isFill={true} />
          <Product isFill={true} />
          <Product isFill={true} />
        </section>
      </div>
    </>
  );
}

export default LikeList;
