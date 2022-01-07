/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import WritingButton from '../components/WritingButton';
import { rem, textDecorationNone, relative } from '../common';
import SearchGreen from '../assets/SearchGreen.svg';
import SearchInput from '../components/SearchInput';
import Category from '../components/Category';
import { useRecoilState, useRecoilValue } from 'recoil';
import { posts, Posts } from '../Atom';

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
  const products = useRecoilValue<Posts[]>(posts);

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
        {products.map((product) => (
          <Link to={`${product.id}`} css={textDecorationNone}>
            <Product
              isFill={false}
              img_urls={product.img_urls}
              address={product.address}
              title={product.title}
              deposit={product.deposit}
              rental_fee={product.rental_fee}
            />
          </Link>
        ))}
      </section>
      <WritingButton />
    </div>
  );
}

export default Main;
