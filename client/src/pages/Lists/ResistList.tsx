/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { color, rem, flex, host } from '../../common';
import ListTab from '../../components/ListTab';
import { Button } from '../../components/Button';
import emptyWriting from '../../assets/pictures/emptyWriting.svg';
import { Link } from 'react-router-dom';
import { link, visit } from './tab';
import { container, section, message } from './tab';
import Product from '../../components/Product';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { UserPost } from './interface';

const img = css`
  margin-top: ${rem(21)};
`;

interface Resists {
  post: UserPost[];
}

const resists = {
  post: [
    {
      post_id: 4,
      post_category: '그릴/버너',
      post_deposit: 50000,
      post_rental_fee: 100000,
      post_unavailable_dates: '2022.01.11,2022.01.12,2022.01.13',
      post_title: '튼튼한 그릴입니다',
      post_content: '절대 쓰러지지 않아요',
      post_longitude: '128.638149961102',
      post_latitude: '35.84398924816',
      post_address: '수성구 황금동',
      post_img_urls:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9YMpUEeAhDovNZilJp_nsjHlg77VuPq3roQ&usqp=CAU',
      post_created_at: '2022-01-11T06:17:48.489Z',
      post_updated_at: '2022-01-11T06:17:48.489Z',
      post_users_id: 2,
    },
  ],
};

function ResistList() {
  const [resistLists, setResistLists] = useState<Resists>(resists);
  const [modalShow, setModalShow] = useState(false);

  // useEffect(() => {
  //   axios
  //     .get(`${host}/userinfo/product/post`)
  //     .then((res) => {
  //       console.log(res.data);
  //       setResistLists(res.data);
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
        <Link to="/lists/likelist" css={link}>
          찜한 목록
        </Link>
        <Link to="/lists/resistlist" css={[link, visit]}>
          내가 쓴 글
        </Link>
      </nav>
      <div css={container}>
        {resistLists['post'].length === 0 ? (
          <>
            <img src={emptyWriting} alt="broken heart" css={img} />
            <p css={message}>
              내가 쓴 글이 없어요!
              <br />
              캠핑 용품이 있다면 대여 게시글을 올려보세요!
            </p>
            <Button
              text="글 쓰러 가기"
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
            {resistLists['post'].map((resistList: UserPost) => (
              <Product
                count={200}
                isFill={true}
                display="none"
                postId={resistList.post_id}
                img_urls={resistList.post_img_urls}
                address={resistList.post_address}
                title={resistList.post_title}
                deposit={resistList.post_deposit}
                rental_fee={resistList.post_rental_fee}
              />
            ))}
          </section>
        )}
      </div>
    </>
  );
}

export default ResistList;
