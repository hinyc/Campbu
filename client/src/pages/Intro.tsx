/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Signup from '../components/Signup';
import { flex, rem } from '../common';
import { Link } from 'react-router-dom';
import ReviewModal from '../components/ReviewModal';
import LoginModal from '../components/LoginModal';

const divStyle = css`
  text-align: center;
  background-color: aquamarine;
`;

const pStyle = css`
  font-size: 3rem;
`;

const inputStyle = css`
  font-size: 1.125rem;
  width: ${rem(636)};
  height: ${rem(60)};
`;

function Intro() {
  return (
    <div css={divStyle}>
      <p css={pStyle}>떠나고 싶지 않으세요?</p>
      <input css={inputStyle} placeholder="어디로 여행가세요?" />
      <button>
        <Link to="/main">검색</Link>
      </button>
      <div css={flex}>
        <Signup />
        <LoginModal />
        <ReviewModal />
      </div>
    </div>
  );
}
export default Intro;
