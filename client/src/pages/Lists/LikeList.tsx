/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { color, rem, flex, textDecorationNone } from '../../common';
import ListTab from '../../components/ListTab';
import { Button } from '../../components/Button';
import emptyHeart from '../../assets/pictures/emptyHeart.svg';
import { Link } from 'react-router-dom';
import { link, visit } from './tab';
import { container, section, message } from './tab';
import Product from '../../components/Product';
import { useRecoilState, useRecoilValue } from 'recoil';
import { likes, UserPost } from '../../Atom';
import { useState } from 'react';

const img = css`
  margin-top: ${rem(51)};
`;

interface Likes {
  posts: UserPost[];
  likes: {
    id: number;
    users_id: number;
    posts_id: number;
  }[];
}

function LikeList() {
  const likeLists = useRecoilValue<Likes>(likes);
  const [modalShow, setModalShow] = useState(false);
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
        <Link to="/lists/likelist" css={[link, visit]}>
          찜한 목록
        </Link>
        <Link to="/lists/resistlist" css={link}>
          내가 쓴 글
        </Link>
      </nav>
      <div css={container}>
        {likeLists['posts'].length === 0 ? (
          <>
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
            />
          </>
        ) : (
          <section css={section}>
            {likeLists['posts'].map((likeList: UserPost) => (
              <Product
                count={likeList.likes_count}
                isFill={true}
                postId={likeList.id}
                img_urls={likeList.img_urls}
                address={likeList.address}
                title={likeList.title}
                deposit={likeList.deposit}
                rental_fee={likeList.rental_fee}
              />
            ))}
          </section>
        )}
      </div>
    </>
  );
}

export default LikeList;
