/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import WritingButton from '../components/WritingButton';
import { rem, textDecorationNone, relative } from '../common';
import SearchGreen from '../assets/SearchGreen.svg';
import SearchInput from '../components/SearchInput';
import Category from '../components/Category';

const container = css`
  width: ${rem(1280)};
  margin: 0 auto;
  margin-top: ${rem(36)};
  margin-bottom: ${rem(16)};
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
  return (
    <div css={container}>
      <Category />
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
