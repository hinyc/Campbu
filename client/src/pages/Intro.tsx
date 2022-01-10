/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { color, hover, rem, relative, host } from '../common';
import { Link, useNavigate } from 'react-router-dom';
import background from '../assets/pictures/background.png';
import Search from '../assets/Search.svg';

import SearchInput from '../components/SearchInput';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { posts } from '../Atom';
import axios from 'axios';
import { Post, Posts } from './Main';
import AlertModal from '../components/AlertModal';

const divStyle = css`
  text-align: center;
`;

const img = css`
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
`;

const pStyle = css`
  font-size: 3rem;
  color: white;
  text-shadow: ${hover};
  padding-top: ${rem(155)};
  z-index: 990;
  cursor: default;
`;

const button = css`
  background-color: white;
  border: none;
  position: absolute;
  right: ${rem(24)};
  top: ${rem(-3)};
  cursor: pointer;
`;

function Intro() {
  const navigation = useNavigate();
  const [searchValue, setSearchValue] = useState<string>('');
  const searchAddress = useSetRecoilState<Posts>(posts);
  const [showModal, setShowModal] = useState(false);

  const onChange = (e: any) => {
    setSearchValue(e.target.value);
  };

  const onSearchClick = () => {
    if (searchValue.length !== 0) {
      console.log(searchValue, ' searching...');
      //   axios
      //     .get(`${host}/product/address/${searchValue}`)
      //     .then((res) => {
      //       if (res.status === 200) {
      searchAddress((obj) => ({
        // TODO: 검색 결과를 여기에 추가
        posts: [
          ...obj.posts,
          {
            id: 1,
            category: 'Tent',
            deposit: 30000,
            rental_fee: 25000,
            unavailable_dates: ['2021-12-20', '2021-12-21', '2021-12-22'],
            title: '테스트테스트',
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
      navigation('/main');
      //   }
      // })
      // .catch((err) => console.error(err));
    } else {
      console.log('input text please');
      // TODO: false로 초기화 시키기
      setShowModal(!showModal);
    }
  };

  return (
    <div css={divStyle}>
      <img src={background} alt="뒷배경" css={img} />
      <p css={[pStyle, relative]}>떠나고 싶지 않으세요?</p>
      {showModal ? <AlertModal text="검색어를 입력해주세요!" /> : null}
      <span css={relative}>
        <SearchInput
          text="어디로 여행가세요?"
          width={`${rem(636)}`}
          height={`${rem(60)}`}
          border="none"
          size={`${rem(18)}`}
          shadow={`${hover}`}
          placeholder={`${color.placeholder}`}
          padding={`${rem(24)}`}
          margin={`${rem(62)} 0 0 0`}
          onChange={onChange}
        />
        <button css={button} onClick={onSearchClick}>
          {/* //TODO: axios 연결 후 Link 지우기 */}
          {/* <Link to="/main"> */}
          <img src={Search} alt="search" />
          {/* </Link> */}
        </button>
      </span>
    </div>
  );
}
export default Intro;
