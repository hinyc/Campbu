/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import WritingButton from '../components/WritingButton';
import { rem, textDecorationNone, relative } from '../common';
import SearchGreen from '../assets/SearchGreen.svg';
import SearchInput from '../components/SearchInput';

const container = css`
  width: ${rem(1280)};
  margin: 0 auto;
  margin-top: ${rem(36)};
  margin-bottom: ${rem(16)};
  text-align: center;
`;

const ulStyle = css`
  display: flex;
  justify-content: center;
  list-style: none;
`;

const categoryStyle = css`
  background-color: #eeefcb;
  margin-left: ${rem(5)};
  margin-right: ${rem(5)};
  width: ${rem(97)};
  height: ${rem(122)};
  font-size: 0.75rem;
  font-weight: 700;
  text-align: center;
`;

const button = css`
  background-color: white;
  border: none;
  position: absolute;
  right: ${rem(24)};
  top: ${rem(-3)};
`;

const section = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20%, auto));
  row-gap: ${rem(26)};
  text-align: left;
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
    <div css={container}>
      <ul css={ulStyle}>
        {category.map((list) => (
          <li css={categoryStyle}>
            <Link to="#">{list}</Link>
          </li>
        ))}
      </ul>
      <span css={relative}>
        <SearchInput
          text="지역을 검색해보세요!"
          width={`${rem(450)}`}
          height={`${rem(50)}`}
          border="1px solid #afc89b"
          size={`${rem(16)}`}
          shadow={`0px 2px 10px rgba(0, 0, 0, 0.1)`}
          placeholder={`#afc89b`}
          padding={`${rem(18)}`}
          margin={`${rem(26)} 0`}
        />
        <button css={button}>
          <img src={SearchGreen} alt="search" />
        </button>
      </span>
      <section css={section}>
        <Link to="1" css={textDecorationNone}>
          <Product isFill={false} />
        </Link>
        <Product isFill={false} />
        <Product isFill={false} />
        <Product isFill={false} />
        <Product isFill={false} />
        <Product isFill={false} />
        <Product isFill={false} />
        <Product isFill={false} />
      </section>
      <WritingButton />
    </div>
  );
}

export default Main;
