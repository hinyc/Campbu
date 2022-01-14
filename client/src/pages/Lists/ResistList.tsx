/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { color, rem, flex, host, config } from '../../common';
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
import { MyPost } from './interface';

const img = css`
  margin-top: ${rem(21)};
`;

interface Resists {
  post: MyPost[];
}

const resists = {
  post: [
    {
      id: 4,
      category: '그릴/버너',
      deposit: 50000,
      rental_fee: 100000,
      unavailable_dates: ['2022.01.11', '2022.01.12', '2022.01.13'],
      title: '튼튼한 그릴입니다',
      content: '절대 쓰러지지 않아요',
      longitude: '128.638149961102',
      latitude: '35.84398924816',
      address: '수성구 황금동',
      img_urls: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9YMpUEeAhDovNZilJp_nsjHlg77VuPq3roQ&usqp=CAU',
      ],
      created_at: '2022-01-11T06:17:48.489Z',
      updated_at: '2022-01-11T06:17:48.489Z',
    },
  ],
};

function ResistList() {
  const [resistLists, setResistLists] = useState<Resists>(resists);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    axios
      .get(`${host}/userinfo/product/post`, config)
      .then((res) => setResistLists(res.data))
      .catch((err) => console.error(err));
  }, []);

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
            {resistLists['post'].map((resistList: MyPost) => (
              <Product
                count={0} //? display: none
                isFill={true} //? display: none
                display="none"
                postId={resistList.id}
                img_urls={resistList.img_urls[0]}
                address={resistList.address}
                title={resistList.title}
                deposit={resistList.deposit}
                rental_fee={resistList.rental_fee}
              />
            ))}
          </section>
        )}
      </div>
    </>
  );
}

export default ResistList;
