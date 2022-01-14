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
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { host } from '../../common';
import { UserPost } from './interface';

const img = css`
  margin-top: ${rem(51)};
`;

interface Likes {
  like: UserPost[];
}

const likes = {
  like: [
    {
      post_id: 2,
      post_category: '의자/테이블',
      post_deposit: 20000,
      post_rental_fee: 40000,
      post_unavailable_dates: '2022.01.11,2022.01.12,2022.01.13',
      post_title: '튼튼한 의자 빌려드려요',
      post_content: '올라가도 안 부서집니다.',
      post_longitude: '127.044484819305',
      post_latitude: '37.2244311943994',
      post_address: '화성시 기산동',
      post_img_urls:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_knddBxuSckGT4LIVnc0SR-j4n9om5-5v5Q&usqp=CAU',
      post_created_at: '2022-01-11T06:14:35.305Z',
      post_updated_at: '2022-01-11T06:14:35.305Z',
      post_users_id: 1,
    },
  ],
};
function LikeList() {
  const [likeLists, setLikeLists] = useState<Likes>(likes);
  const [modalShow, setModalShow] = useState(false);

  // useEffect(() => {
  //   axios
  //     .get(`${host}/userinfo/product/like`)
  //     .then((res) => {
  //       console.log(res.data);
  //       setLikeLists(res.data);
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
        {likeLists['like'].length === 0 ? (
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
            {likeLists['like'].map((likeList: UserPost) => (
              <Product
                count={99}
                isFill={true}
                postId={likeList.post_id}
                img_urls={likeList.post_img_urls}
                address={likeList.post_address}
                title={likeList.post_title}
                deposit={likeList.post_deposit}
                rental_fee={likeList.post_rental_fee}
              />
            ))}
          </section>
        )}
      </div>
    </>
  );
}

export default LikeList;
