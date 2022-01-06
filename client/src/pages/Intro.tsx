/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Signup from '../components/Signup';
import { color, hover, rem } from '../common';
import { Link } from 'react-router-dom';
import background from '../assets/pictures/background.png';
import Search from '../assets/Search.svg';

const img = css`
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
  /* z-index: 1; */
`;

const divStyle = css`
  text-align: center;
  background-color: aquamarine;
  /* z-index: 999; */
`;

const pStyle = css`
  font-size: 3rem;
  color: white;
  text-shadow: ${hover};
  padding-top: ${rem(155)};
`;

const inputStyle = css`
  font-size: 1.125rem;
  width: ${rem(636)};
  height: ${rem(60)};
  border-radius: ${rem(10)};
  border: none;
  box-shadow: ${hover};
  padding-left: ${rem(24)};
  margin-top: ${rem(62)};

  ::-webkit-input-placeholder {
    color: ${color.placeholder};
  } /* Chrome/Opera/Safari */
  ::-moz-placeholder {
    color: ${color.placeholder};
  } /* Firefox 19+ */
  :-ms-input-placeholder {
    color: ${color.placeholder};
  } /* IE 10+ */
  :-moz-placeholder {
    color: ${color.placeholder};
  } /* Firefox 18- */
`;

function Intro() {
  return (
    <div css={divStyle}>
      {/* <img src={background} alt="뒷배경" css={img} /> */}
      <p css={pStyle}>떠나고 싶지 않으세요?</p>
      <input css={inputStyle} placeholder="어디로 여행가세요?" />
      <button>
        <Link to="/main">검색</Link>
      </button>
      {/* <Signup /> */}
    </div>
  );
}
export default Intro;
