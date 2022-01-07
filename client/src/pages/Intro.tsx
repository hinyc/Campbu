/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';


import { color, hover, rem, flex, relative } from '../common';
import { Link } from 'react-router-dom';
import background from '../assets/pictures/background.png';
import Search from '../assets/Search.svg';


import SearchInput from '../components/SearchInput';

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
`;

function Intro() {
  return (
    <div css={divStyle}>
      <img src={background} alt="뒷배경" css={img} />
      <p css={[pStyle, relative]}>떠나고 싶지 않으세요?</p>
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
        />
        <button css={button}>
          <Link to="/main">
            <img src={Search} alt="search" />
          </Link>
        </button>
      </span>

      <div css={flex}>{/* <ReviewModal /> */}</div>

    </div>
  );
}
export default Intro;
