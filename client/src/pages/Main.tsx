/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link, useNavigate } from 'react-router-dom';
import Product from '../components/Product';
import WritingButton from '../components/WritingButton';
import { rem, textDecorationNone, relative } from '../common';
import SearchGreen from '../assets/SearchGreen.svg';
import SearchInput from '../components/SearchInput';
import Category from '../components/Category';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { posts } from '../Atom';
import { useState } from 'react';
import LoginModal from '../components/LoginModal';
import AlertModal from '../components/AlertModal';

const container = css`
  width: ${rem(1280)};
  margin: 0 auto;
  margin-top: ${rem(36)};
  margin-bottom: ${rem(16)};
  text-align: center;
`;

const button = css`
  background-color: white;
  border: none;
  position: absolute;
  right: ${rem(24)};
  top: ${rem(-3)};
  cursor: pointer;
`;

const section = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20%, auto));
  row-gap: ${rem(26)};
  text-align: left;
`;

export interface Posts {
  posts: Post[];
}

export interface Post {
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
  reservation_dates: string[];
  likes: {
    count: number;
  };
}

function Main() {
  const products = useRecoilValue<Posts>(posts);
  const searchAddress = useSetRecoilState<Posts>(posts);
  const [searchValue, setSearchValue] = useState<string>('');
  const [modalShow, setModalShow] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);

  const onChange = (e: any) => {
    setSearchValue(e.target.value);
  };

  const onSearchClick = () => {
    if (searchValue.length !== 0) {
      console.log(showSearchModal, ' main page searching...');
      //   axios
      //     .get(`${host}/product/address/${searchValue}`)
      //     .then((res) => {
      //       if (res.status === 200) {
      searchAddress((obj) => ({
        // TODO: 검색 결과를 여기에 추가
        posts: [
          {
            id: 1,
            category: 'Tent',
            deposit: 30000,
            rental_fee: 25000,
            unavailable_dates: ['2021-12-20', '2021-12-21', '2021-12-22'],
            title: '검색했을 때 새로 나오는거',
            content: '쉽게 설치할 수 있는 3~4인용 텐트입니다.',
            longitude: 126.99597295767953,
            latitude: 35.97664845766847,
            address: '서울특별시 동작구 신대방동',
            img_urls:
              'https://paperbarkcamp.com.au/wp-content/uploads/2019/07/paperbark_flash-camp_news_1218x650.jpg',
            users_id: 1,
            reservation_dates: ['2021-12-29', '2021-12-30', '2021-12-31'],
            likes: {
              count: 15,
            },
          },
          {
            id: 1,
            category: 'Tent',
            deposit: 30000,
            rental_fee: 25000,
            unavailable_dates: ['2021-12-20', '2021-12-21', '2021-12-22'],
            title: '메인페이지 검색',
            content: '쉽게 설치할 수 있는 3~4인용 텐트입니다.',
            longitude: 126.99597295767953,
            latitude: 35.97664845766847,
            address: '서울특별시 동작구 신대방동',
            img_urls:
              'https://paperbarkcamp.com.au/wp-content/uploads/2019/07/paperbark_flash-camp_news_1218x650.jpg',
            users_id: 1,
            reservation_dates: ['2021-12-29', '2021-12-30', '2021-12-31'],
            likes: {
              count: 15,
            },
          },
        ],
      }));
      //   }
      // })
      // .catch((err) => console.error(err));
    } else {
      console.log('input text please');
      // TODO: false로 초기화 시키기
      setShowSearchModal(!showSearchModal);
    }
  };

  return (
    <div css={container}>
      <Category />
      {showSearchModal ? <AlertModal text="검색어를 입력해주세요!" /> : null}
      <span css={relative}>
        <SearchInput
          text="지역을 검색해보세요!"
          width={`${rem(450)}`}
          height={`${rem(50)}`}
          border="1px solid #afc89b"
          size={`${rem(16)}`}
          shadow={`0px 2px 10px rgba(0, 0, 0, 0.1)`}
          placeholder={`#afc89b`}
          padding={`${rem(18)}`}
          margin={`${rem(26)} 0`}
          onChange={onChange}
        />
        <button css={button} onClick={onSearchClick}>
          <img src={SearchGreen} alt="search" />
        </button>
      </span>
      {modalShow ? <LoginModal /> : null}
      <section css={section}>
        {products['posts'].map((product: Post) => (
          <Product
            setModalShow={setModalShow}
            count={product.likes.count}
            // TODO: 좋아요 눌렀는지 안눌렀는지 상태 변경
            isFill={false}
            postId={product.id}
            img_urls={product.img_urls}
            address={product.address}
            title={product.title}
            deposit={product.deposit}
            rental_fee={product.rental_fee}
          />
        ))}
      </section>
      <WritingButton />
    </div>
  );
}

export default Main;
