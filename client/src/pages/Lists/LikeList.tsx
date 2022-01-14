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
import { LikePost } from './interface';

const img = css`
  margin-top: ${rem(51)};
`;

interface Likes {
  like: LikePost[];
}

const likes = {
  like: [
    {
      id: 2,
      category: '의자/테이블',
      deposit: 20000,
      rental_fee: 40000,
      unavailable_dates: ['2022.01.11', '2022.01.12', '2022.01.13'],
      title: '튼튼한 의자 빌려드려요',
      content: '올라가도 안 부서집니다.',
      longitude: '127.044484819305',
      latitude: '37.2244311943994',
      address: '화성시 기산동',
      img_urls: ['s3.com', 's4.com', 's5.com'],
      created_at: '2022-01-11T06:14:35.305Z',
      updated_at: '2022-01-11T06:14:35.305Z',
      likes_count: 2,
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
            {likeLists['like'].map((likeList: LikePost) => (
              <Product
                count={likeList.likes_count}
                isFill={true}
                postId={likeList.id}
                img_urls={likeList.img_urls[0]}
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
