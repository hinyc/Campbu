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
  confirm,
  flexVertical,
  flexBetween,
  flex,
} from '../common';
import { Link, useNavigate } from 'react-router-dom';
import background from '../assets/pictures/background.png';
import Search from '../assets/Search.svg';

import SearchInput from '../components/SearchInput';
import { useEffect, useState } from 'react';
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import {
  posts,
  selectAddress,
  showAddressList,
  showAlertModal,
  searchAddress,
  originalPosts,
  isLoading,
  isLogin,
  likedProducts,
  navbarOn,
} from '../Atom';
import axios from 'axios';
import { Post, Posts } from './Main';
import AlertModal from '../components/AlertModal';
import SelectAddressList from '../components/SelectAddress';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import IntroTop from '../assets/IntroTop.svg';
import Intro0 from '../assets/Intro0.svg';
import Intro1 from '../assets/Intro1.svg';
import Intro2 from '../assets/Intro2.svg';
import Intro3 from '../assets/Intro3.svg';
import Intro4 from '../assets/Intro4.svg';
import IntroBottom from '../assets/IntroBottom.svg';

const divStyle = css`
  width: ${rem(1280)};
  text-align: center;
`;

const img = css`
  width: auto;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  position: 50% 50%;
  @media (min-width: 1600px) {
    width: 100%;
    height: auto;
    position: 50% 50%;
  }
`;

const alignLeft = css`
  align-items: flex-start;
  justify-content: center;
`;
const alignLRight = css`
  align-items: flex-end;
`;
const intro2TextStyle = css`
  font-size: ${rem(24)};
  line-height: 2rem;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.5rem;
`;
const button = css`
  background-color: white;
  border: none;
  position: absolute;
  right: ${rem(24)};
  cursor: pointer;
`;

const addressListStyle = css`
  position: absolute;
  top: ${rem(60)};
  left: 50%;
  transform: translateX(-50%);
`;

const container = css`
  height: 100vh;
  width: 100vw;
  min-width: ${rem(950)};
  min-height: ${rem(670)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const viewCenter = css`
  height: 100vh;
  width: 100vw;
  max-width: ${rem(1060)};
  min-width: ${rem(950)};
  min-height: ${rem(500)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  scroll-snap-align: center;
`;

const subTitle = css`
  font-size: 3rem;
  line-height: 3.8rem;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  margin: 1.5rem 0;
  color: ${color.deep};
  /* text-shadow: ${hover}; */
  /* z-index: 990; */
  cursor: default;
`;

const numStyle = css`
  font-size: ${rem(36)};
  color: ${color.deep};
`;

const exTextStyle = css`
  font-size: ${rem(18)};
  line-height: ${rem(26)};
  margin: 0.2rem 0;
`;

const limitSize = css`
  max-width: ${rem(1060)};
  min-width: ${rem(950)};
`;
const code = new URL(window.location.href).searchParams.get('code');

function Intro() {
  const navigation = useNavigate();
  const searchAddressList = useSetRecoilState<Posts>(posts);
  const setMainSearch = useSetRecoilState<Posts>(originalPosts);
  const [showModal, setShowModal] = useRecoilState(showAlertModal);
  const [searchValue, setSearchValue] = useRecoilState(selectAddress);
  const setSearchAddress = useSetRecoilState(searchAddress);
  const [showAddress, setShowAddress] = useRecoilState(showAddressList);
  const setIsLoading = useSetRecoilState(isLoading);
  const login = useRecoilValue(isLogin);
  const [selected, setSelected] = useState<boolean>(false);
  const setLikedPosts = useSetRecoilState(likedProducts);
  const resetOriginalPosts = useResetRecoilState(originalPosts);
  const [navOn, setNavOn] = useRecoilState(navbarOn);

  useEffect(() => {
    setSearchValue('');
    setShowAddress(false);
    resetOriginalPosts();
  }, [resetOriginalPosts, setSearchValue, setShowAddress]);

  useEffect(() => {
    localStorage.removeItem('address');
    localStorage.removeItem('category');
    setNavOn(false);
  }, []);

  const onChange = (e: any) => {
    setSearchValue(e.target.value);
  };

  const onSearchClick = () => {
    axios
      .get(
        `https://www.juso.go.kr/addrlink/addrLinkApi.do?currentPage=1&countPerPage=50&keyword=${searchValue}&confmKey=${addressAPI}&resultType=json`,
        { headers: { 'Content-Type': 'application/json' } },
      )
      .then((res) => {
        const address = res.data.results.juso;
        const addressList: string[] = [];
        if (address) {
          const allSearchAddress = address.map(
            (el: any) => `${el.siNm} ${el.sggNm} ${el.emdNm}`,
          );
          allSearchAddress.forEach((el: string, idx: number) => {
            if (allSearchAddress.indexOf(el) === idx) {
              addressList.push(el);
            }
          });
        }
        setSearchAddress(addressList);
        setShowAddress(true);
      });
  };

  const onSearchPress = (e: any) => {
    if (e.key === 'Enter') {
      onSearchClick();
    }
  };

  return (
    <div
      css={[
        flexVertical,
        css`
          background-color: #fafaef;
          scroll-snap-type: y mandatory;
        `,
      ]}
    >
      {showModal && <AlertModal text="검색어를 입력해주세요!" />}
      <div
        className="top"
        css={[
          container,
          css`
            background-color: #fafaef;
          `,
        ]}
      >
        <div className="navbar">{navOn ? null : <Navbar />}</div>
        <div css={[viewCenter]}>
          <div
            css={[
              flexBetween,
              css`
                align-items: center;
              `,
            ]}
          >
            <div className="left">
              <div
                css={[
                  subTitle,
                  alignLeft,
                  css`
                    padding-bottom: 12vh;
                  `,
                ]}
              >
                <div>여러분의 동네에서</div>
                <div>캠핑용품을 찾아보세요.</div>
                <div
                  className="Search"
                  css={[
                    relative,
                    css`
                      width: ${rem(468)};
                      display: flex;
                      margin-top: ${rem(20)};
                      justify-content: center;
                      align-items: center;
                    `,
                  ]}
                >
                  <SearchInput
                    text="사는 동네를 입력해보세요! (ex. ㅇㅇ동)"
                    width={`${rem(468)}`}
                    height={`${rem(60)}`}
                    border="none"
                    size={`${rem(18)}`}
                    shadow={`${hover}`}
                    placeholder={`${color.placeholder}`}
                    padding={`${rem(24)}`}
                    margin={'0'}
                    onChange={onChange}
                    value={searchValue}
                    onKeyPress={onSearchPress}
                  />
                  <button css={button} onClick={onSearchClick}>
                    <img src={Search} alt="search" draggable="false" />
                  </button>
                  <div css={addressListStyle}>
                    {showAddress ? (
                      <SelectAddressList width={460} barogagi={true} />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="right"
              css={css`
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                padding-top: 4rem;
              `}
            >
              <img src={IntroTop} alt="introtop" draggable="false" />
            </div>
          </div>
        </div>
      </div>
      <div
        css={[
          container,
          css`
            background-color: #dce1db;
          `,
        ]}
        className="0"
      >
        <div
          css={[
            viewCenter,
            css`
              align-items: center;
            `,
          ]}
        >
          <div css={[intro2TextStyle]}>
            <div>자연 속으로 캠핑은 가고 싶은데 캠핑 용품은 없는 당신!</div>
            <div>캠핑 용품이 부답스럽고 비싸지 않았나요?</div>
            <div>가까운 이웃들에게 대여해서 특별한 경험을 만들어보세요!</div>
          </div>
          <div>
            <img src={Intro0} alt="introtop" draggable="false" />
          </div>
        </div>
      </div>
      <div
        css={[
          container,
          css`
            background-color: #fafaef;
          `,
        ]}
        className="1"
      >
        <div css={viewCenter}>
          <div css={flexBetween}>
            <div
              className="left"
              css={css`
                margin-left: 4rem;
              `}
            >
              <div css={[flexVertical, alignLeft]}>
                <div css={numStyle}>01</div>
                <div css={[subTitle, alignLeft]}>
                  <div>여러분의 동네를</div>
                  <div>검색해보세요.</div>
                </div>
                <div css={[flexVertical, alignLeft, exTextStyle]}>
                  <div>여러분이 원하는 캠핑용품을</div>
                  <div>가까운 곳에서 빌릴 수 있습니다.</div>
                </div>
              </div>
            </div>
            <div
              className="right"
              css={css`
                margin-top: 2rem;
                margin-right: 5rem;
              `}
            >
              <img src={Intro1} alt="intro1" draggable="false" />
            </div>
          </div>
        </div>
      </div>

      <div
        css={[
          container,
          css`
            background-color: ${color.white};
          `,
        ]}
        className="2"
      >
        <div css={viewCenter}>
          <div css={flexBetween}>
            <div
              className="left"
              css={css`
                margin-left: 1rem;
              `}
            >
              <img src={Intro2} alt="intro2" draggable="false" />
            </div>
            <div className="right">
              <div css={[flexVertical, alignLRight]}>
                <div css={numStyle}>02</div>
                <div css={[subTitle, alignLRight]}>
                  <div>여러분이 원하는 물건을</div>
                  <div>예약하세요.</div>
                </div>
                <div css={exTextStyle}>
                  원하는 날짜를 선택하고 예약신청을 할 수 있습니다.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div css={container} className="3">
        <div css={viewCenter}>
          <div
            css={[
              flexBetween,
              css`
                align-items: center;
              `,
            ]}
          >
            <div
              className="left"
              css={css`
                margin-left: 3rem;
              `}
            >
              <div css={[flexVertical, alignLeft]}>
                <div css={numStyle}>03</div>
                <div css={[subTitle, alignLeft]}>
                  <div>여러분의 물건을</div>
                  <div>등록하세요.</div>
                </div>
                <div css={[flexVertical, exTextStyle, alignLeft]}>
                  <p>빌려주고 싶은 물건을</p>
                  <p>가능한 날짜와 함께 등록할 수 있습니다.</p>
                </div>
              </div>
            </div>
            <div
              className="right"
              css={css`
                margin-right: 2rem;
                margin-bottom: 10vh;
              `}
            >
              <img src={Intro3} alt="intro3" draggable="false" />
            </div>
          </div>
        </div>
      </div>

      <div
        css={[
          container,
          css`
            background-color: ${color.white};
          `,
        ]}
        className="4"
      >
        <div className="4" css={viewCenter}>
          <div className="center" css={flexVertical}>
            <div css={[numStyle]}>04</div>
            <div
              css={[
                subTitle,
                css`
                  margin-bottom: 0;
                `,
              ]}
            >
              여러분의 시간에 맞춰 약속을 잡으세요.
            </div>
            <img
              css={exTextStyle}
              src={Intro4}
              alt="intro4"
              draggable="false"
            />
            <div>1:1 채팅을 통해 조건을 조율할 수 있습니다.</div>
          </div>
        </div>
      </div>

      <div css={[container]} className="bottom">
        <div css={[relative, viewCenter]}>
          <div
            css={[
              flexBetween,
              css`
                align-items: center;
                margin-bottom: 30vh;
                min-height: ${rem(670)};
              `,
            ]}
          >
            <div
              className="left"
              css={css`
                margin-top: 3rem;
                margin-left: 3rem;
              `}
            >
              <img
                src={IntroBottom}
                alt="introboIntroBottom"
                draggable="false"
              />
            </div>
            <div className="right">
              <div css={[subTitle]}>
                <div>여러분!</div>
                <div>캠핑 갈 준비 되셨나요?</div>
                <div>지금 당장 검색해보세요.</div>
              </div>
              <div
                css={[
                  relative,
                  css`
                    width: ${rem(468)};
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  `,
                ]}
              >
                <SearchInput
                  text="사는 동네를 입력해보세요! (ex. ㅇㅇ동)"
                  width={`${rem(468)}`}
                  height={`${rem(60)}`}
                  border="none"
                  size={`${rem(18)}`}
                  shadow={`${hover}`}
                  placeholder={`${color.placeholder}`}
                  padding={`${rem(24)}`}
                  margin={'0'}
                  onChange={onChange}
                  value={searchValue}
                  onKeyPress={onSearchPress}
                />
                <button css={button} onClick={onSearchClick}>
                  <img src={Search} alt="search" draggable="false" />
                </button>
                <div css={addressListStyle}>
                  {showAddress ? (
                    <SelectAddressList width={460} barogagi={true} />
                  ) : null}
                </div>
              </div>
            </div>
            <div className="footer">
              {navOn ? null : (
                <div
                  css={css`
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                  `}
                >
                  <Footer />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Intro;
