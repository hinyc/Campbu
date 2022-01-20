/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import Product from '../components/Product';
import WritingButton from '../components/WritingButton';
import { rem, relative, host, addressAPI, config } from '../common';
import SearchGreen from '../assets/SearchGreen.svg';
import SearchInput from '../components/SearchInput';
import Category from '../components/Category';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  posts,
  originalPosts,
  showLoginModal,
  showAlertModal,
  selectAddress,
  showAddressList,
  searchAddress,
  isLoading,
  isLogin,
  likedProducts,
  selectCategory,
} from '../Atom';
import { useEffect, useState } from 'react';
import AlertModal from '../components/AlertModal';
import axios from 'axios';
import Load from '../assets/Load.svg';
import emptySearchResult from '../assets/pictures/emptySearchResult.svg';
import Geolocation from '../assets/pictures/Geolocation.svg';
import { message } from './Lists/tab';
import SelectAddressList from '../components/SelectAddress';

const container = css`
  width: ${rem(1280)};
  margin: 0 auto;
  margin-top: ${rem(36)};
  margin-bottom: ${rem(100)};
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
  margin-top: ${rem(26)};
`;

const addressListStyle = css`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 990;
`;

const loading = keyframes`
  100% { transform: rotate(360deg); }
`;

const load = css`
  margin: ${rem(100)} auto ${rem(200)} auto;
  animation: ${loading} 6s linear infinite;
  transform-origin: 50% 50%;
`;

export interface Posts {
  posts: Post[];
  likes?: { posts_id: number }[];
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
  img_urls: string[];
  users_id: number;
  created_at?: string;
  updated_at?: string;
  likes_count: number;
}

function Main() {
  const [products, setProducts] = useRecoilState<Posts>(posts);
  const [mainSearch, setMainSearch] = useRecoilState<Posts>(originalPosts);
  const [loading, setIsLoading] = useRecoilState(isLoading);
  const [showModal, setShowModal] = useRecoilState(showAlertModal);
  const [searchValue, setSearchValue] = useRecoilState(selectAddress);
  const [addressList, setSearchAddress] = useRecoilState(searchAddress);
  const [showAddress, setShowAddress] = useRecoilState(showAddressList);
  const login = useRecoilValue(isLogin);
  const [selected, setSelected] = useState<boolean>(false);
  const [likedPosts, setLikedPosts] = useRecoilState<number[]>(likedProducts);
  const category = useRecoilValue(selectCategory);

  const [address, setAddress] = useState('');

  useEffect(() => {
    if (searchValue) {
      setIsLoading(true);
      axios
        .get(`${host}/product/address/${searchValue}`, config)
        .then((res) => {
          if (res.status === 200) {
            console.log(`${host}/product/address/${searchValue}`, res.data);
            setMainSearch(res.data);
            console.log(res.data);
            if (login && res.data.likes) {
              const likes = res.data.likes.map(
                (obj: { posts_id: number }) => obj.posts_id,
              );
              setLikedPosts(likes);
            }
          }
          if (category === '전체') {
            const filtered = res.data.posts.filter(
              (obj: any) => obj.category !== 'dummy',
            );
            setProducts({ posts: filtered });
          } else {
            const filtered = res.data.posts.filter(
              (obj: any) => obj.category === category,
            );
            setProducts({ posts: filtered });
          }
        })
        .catch((err) => {
          console.error('검색결과가 없습니다.', err);
          setIsLoading(false);
        });
      setIsLoading(false);
    }
    if (searchValue) {
      setAddress(searchValue);
    }
  }, [
    login,
    setProducts,
    searchValue,
    setIsLoading,
    setLikedPosts,
    setMainSearch,
    category,
  ]);

  const onChange = (e: any) => {
    setAddress(e.target.value);
  };

  const onSearchClick = async () => {
    await axios
      .get(
        `https://www.juso.go.kr/addrlink/addrLinkApi.do?currentPage=1&countPerPage=50&keyword=${address}&confmKey=${addressAPI}&resultType=json`,
        { headers: { 'Content-Type': 'application/json' } },
      )
      .then((res) => {
        const address = res.data.results.juso;
        const addressList: string[] = [];
        if (address) {
          const allSearchAddress = address.map((el: any) => {
            return `${el.siNm} ${el.sggNm} ${el.emdNm}`;
          });
          allSearchAddress.forEach((el: string, idx: number) => {
            if (allSearchAddress.indexOf(el) === idx) {
              addressList.push(el);
            }
          });
        }
        setSearchAddress(addressList);
        setShowAddress(true);
        setSearchValue('');
      });
  };

  const onSearchPress = (e: any) => {
    if (e.key === 'Enter') {
      onSearchClick();
    }
  };

  return (
    <div css={container}>
      <Category />
      {showModal && <AlertModal text="검색어를 입력해주세요!" />}
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
          margin={`${rem(26)} 0 0 0`}
          onChange={onChange}
          value={address}
          onKeyPress={onSearchPress}
        />
        <button css={button} onClick={onSearchClick}>
          <img src={SearchGreen} alt="search" draggable="false" />
        </button>
      </span>
      <div css={addressListStyle}>
        {showAddress && <SelectAddressList width={450} />}
      </div>
      {loading ? (
        <div css={load}>
          <img src={Load} alt="loading..." />
        </div>
      ) : products['posts'].length ? (
        <section css={section}>
          {products['posts'].map((product: Post, index) => (
            <Product
              key={index}
              count={product.likes_count}
              isFill={likedPosts.includes(product.id)}
              postId={product.id}
              img_urls={product.img_urls[0]}
              address={product.address}
              title={product.title}
              deposit={product.deposit}
              rental_fee={product.rental_fee}
            />
          ))}
        </section>
      ) : searchValue ? (
        <div style={{ margin: `${rem(80)} 0 ${rem(150)} 0` }}>
          <img src={emptySearchResult} alt="camping" />
          <p css={[message, `font-weight: 700`]}>
            검색 결과가 없어요! 다시 검색해주세요.
          </p>
        </div>
      ) : (
        <div style={{ margin: `${rem(80)} 0 ${rem(150)} 0` }}>
          <img src={Geolocation} alt="please search" />
          <p css={[message, `font-weight: 700`]}>
            검색된 게 없어요, 지역을 검색해주세요!
          </p>
        </div>
      )}
      <WritingButton />
    </div>
  );
}

export default Main;
