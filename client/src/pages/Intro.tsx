/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Signup from '../components/Signup';
import { rem } from '../common';

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
      <button>검색</button>
      <Signup />
    </div>
  );
}
export default Intro;
