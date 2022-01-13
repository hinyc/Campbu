/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import {
  color,
  hover,
  rem,
  relative,
  host,
  addressAPI,
  absolute,
} from '../common';
import { Link, useNavigate } from 'react-router-dom';
import background from '../assets/pictures/background.png';
import Search from '../assets/Search.svg';

import SearchInput from '../components/SearchInput';
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  posts,
  selectAddress,
  showAddressList,
  showAlertModal,
  searchAddress,
} from '../Atom';
import axios from 'axios';
import { Post, Posts } from './Main';
import AlertModal from '../components/AlertModal';
import SelectAddressList from '../components/SelectAddress';

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

const addressListStyle = css`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const code = new URL(window.location.href).searchParams.get('code');

if (code) {
  console.log('코드있다');
  console.log('code', code);
  console.log('axios요청 보내기 ?');
}

function Intro() {
  const navigation = useNavigate();
  const searchAddressList = useSetRecoilState<Posts>(posts);
  const [showModal, setShowModal] = useRecoilState(showAlertModal);
  const [searchValue, setSearchValue] = useRecoilState(selectAddress);
  const setSearchAddress = useSetRecoilState(searchAddress);
  const [showAddress, setShowAddress] = useRecoilState(showAddressList);

  const onChange = (e: any) => {
    setSearchValue(e.target.value);
  };

  const onSearchClick = () => {
    if (searchValue.length !== 0) {
      getAddress();
      console.log(searchValue.length);
      if (searchValue.length > 5) {
        // axios
        //   .get(`${host}/product/address/:${searchValue}`)
        //   .then((res) => {
        //     if (res.status === 200) {
        searchAddressList({
          // TODO: 검색 결과를 여기에 추가
          posts: [
            {
              id: 1,
              category: 'Tent',
              deposit: 30000,
              rental_fee: 25000,
              unavailable_dates: ['2021-12-20', '2021-12-21', '2021-12-22'],
              title: '테스트테스트1',
              content: '쉽게 설치할 수 있는 3~4인용 텐트입니다.',
              longitude: 126.99597295767953,
              latitude: 35.97664845766847,
              address: '서울특별시 동작구 신대방동',
              img_urls:
                'https://paperbarkcamp.com.au/wp-content/uploads/2019/07/paperbark_flash-camp_news_1218x650.jpg',
              users_id: 1,
              reservation_dates: ['2021-12-29', '2021-12-30', '2021-12-31'],
              likes_count: 15,
            },
            {
              id: 1,
              category: 'Chair',
              deposit: 30000,
              rental_fee: 25000,
              unavailable_dates: ['2021-12-20', '2021-12-21', '2021-12-22'],
              title: '테스트테스트2',
              content: '쉽게 설치할 수 있는 3~4인용 텐트입니다.',
              longitude: 126.99597295767953,
              latitude: 35.97664845766847,
              address: '서울특별시 동작구 신대방동',
              img_urls:
                'https://paperbarkcamp.com.au/wp-content/uploads/2019/07/paperbark_flash-camp_news_1218x650.jpg',
              users_id: 1,
              reservation_dates: ['2021-12-29', '2021-12-30', '2021-12-31'],
              likes_count: 15,
            },
          ],
        });
        navigation('/main');
        //   }
        // })
        // .catch((err) => console.error('에러입니다', err));
      }
      setSearchValue('');
    } else {
      console.log('input text please');
      // TODO: false로 초기화 시키기
      setShowModal(true);
    }
  };

  const getAddress = () => {
    axios
      .get(
        `https://www.juso.go.kr/addrlink/addrLinkApi.do?currentPage=1&countPerPage=50&keyword=${searchValue}&confmKey=${addressAPI}&resultType=json`,
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
      });
    setSearchValue('');
  };

  return (
    <div css={divStyle}>
      <img src={background} alt="뒷배경" css={img} />
      <p css={[pStyle, relative]}>떠나고 싶지 않으세요?</p>
      {showModal && <AlertModal text="검색어를 입력해주세요!" />}
      <span css={relative}>
        <SearchInput
          text="사는 동네를 입력해보세요! (ex. ㅇㅇ동)"
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
      <div css={addressListStyle}>
        {showAddress && <SelectAddressList width={600} />}
      </div>
    </div>
  );
}
export default Intro;
