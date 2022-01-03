/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';

const divStyle = css`
  text-align: center;
  background-color: aquamarine;
`;

const pStyle = css`
  font-size: 3rem;
`;

const inputStyle = css`
  font-size: 1.125rem;
  width: 636px;
  height: 60px;
`;

function Intro() {
  return (
    <div css={divStyle}>
      <p css={pStyle}>떠나고 싶지 않으세요?</p>
      <input css={inputStyle} placeholder="어디로 여행가세요?" />
      <button>검색</button>
    </div>
  );
}

export default Intro;
