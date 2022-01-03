/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';
import Product from '../components/Product';

const divStyle = css`
  text-align: center;
  margin: 0 12.75rem;
`;

const ulStyle = css`
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
`;

const categoryStyle = css`
  background-color: #eeefcb;
  margin-left: 5px;
  margin-right: 5px;
  width: 97px;
  height: 122px;
  font-size: 0.75rem;
  font-weight: 700;
  text-align: center;
`;

const inputStyle = css`
  font-size: 0.875rem;
  width: 420px;
  height: 43px;
`;

const section = css`
  display: flex;
`;

function Main() {
  return (
    <div css={divStyle}>
      <ul css={ulStyle}>
        <li css={categoryStyle}>전체</li>
        <li css={categoryStyle}>패키지</li>
        <li css={categoryStyle}>텐트/침낭</li>
        <li css={categoryStyle}>그릴/버너</li>
        <li css={categoryStyle}>의자/테이블</li>
        <li css={categoryStyle}>배낭/아이스박스</li>
        <li css={categoryStyle}>취식용품</li>
        <li css={categoryStyle}>기타</li>
      </ul>
      <input placeholder="지역을 검색해보세요!" css={inputStyle} />
      <button>검색</button>
      <section css={section}>
        <Product />
        <Product />
        <Product />
        <Product />
      </section>
    </div>
  );
}

export default Main;
