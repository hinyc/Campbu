/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Product from '../components/Product';
import WritingButton from '../components/WritingButton';

const divStyle = css`
  text-align: center;
  margin: 0 12.75rem;
  width: 1280px;
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
  justify-content: flex-start;
  flex-wrap: wrap;
`;

function Main() {
  const category: string[] = [
    '전체',
    '패키지',
    '텐트/침낭',
    '그릴/버너',
    '의자/테이블',
    '배낭/아이스박스',
    '취식용품',
    '기타',
  ];

  return (
    <div css={divStyle}>
      <ul css={ulStyle}>
        {category.map((list) => (
          <li css={categoryStyle}>
            <a href="#">{list}</a>
          </li>
        ))}
      </ul>
      <input placeholder="지역을 검색해보세요!" css={inputStyle} />
      <button>검색</button>
      <section css={section}>
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </section>
      <WritingButton />
    </div>
  );
}

export default Main;
