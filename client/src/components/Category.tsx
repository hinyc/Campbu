/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { rem, textDecorationNone, color, shadow, hover } from '../common';
import categoryAll from '../assets/categoryAll.svg';

const ulStyle = css`
  display: flex;
  justify-content: center;
  list-style: none;
`;

const categoryStyle = css`
  background-color: #eeefcb;
  color: ${color.deep};
  margin: 0 ${rem(7)};
  width: ${rem(110)};
  height: ${rem(130)};
  font-size: ${rem(14)};
  font-weight: 700;
  text-align: center;
  border-radius: ${rem(10)};
  box-shadow: ${shadow};
  :hover {
    box-shadow: ${hover};
    border: 2px solid ${color.deep};
    background-color: white;
  }
`;

const img = css`
  display: inline-block;
  margin: ${rem(25)} ${rem(18)} ${rem(4)} ${rem(18)};
`;

function Category() {
  return (
    <ul css={ulStyle}>
      <Link to="#" css={textDecorationNone}>
        <li css={categoryStyle}>
          <img src={categoryAll} alt="all products" css={img} />
          전체
        </li>
      </Link>
      <Link to="#" css={textDecorationNone}>
        <li css={categoryStyle}>패키지</li>
      </Link>
      <Link to="#" css={textDecorationNone}>
        <li css={categoryStyle}>텐트/침낭</li>
      </Link>
      <Link to="#" css={textDecorationNone}>
        <li css={categoryStyle}>그릴/버너</li>
      </Link>
      <Link to="#" css={textDecorationNone}>
        <li css={categoryStyle}>의자/테이블</li>
      </Link>
      <Link to="#" css={textDecorationNone}>
        <li css={categoryStyle}>배낭/아이스박스</li>
      </Link>
      <Link to="#" css={textDecorationNone}>
        <li css={categoryStyle}>취식용품</li>
      </Link>
      <Link to="#" css={textDecorationNone}>
        <li css={categoryStyle}>기타</li>
      </Link>
    </ul>
  );
}

export default Category;
