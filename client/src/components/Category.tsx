/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { rem, color, shadow, hover } from '../common';
import categoryAll from '../assets/categoryAll.svg';
import categoryBag from '../assets/categoryBag.svg';
import categoryChair from '../assets/categoryChair.svg';
import categoryETC from '../assets/categoryETC.svg';
import categoryFire from '../assets/categoryFire.svg';
import categoryPot from '../assets/categoryPot.svg';
import categoryPack from '../assets/categoryPack.svg';
import categoryTent from '../assets/categoryTent.svg';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { originalPosts, posts } from '../Atom';
import { Posts } from '../pages/Main';

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
  cursor: pointer;
  :hover {
    box-shadow: ${hover};
    border: 2px solid ${color.deep};
    background-color: white;
  }
`;

const img = css`
  display: inline-block;
  margin: 0 auto;
  margin-top: ${rem(26)};
  margin-bottom: ${rem(4)};
`;

const text = css`
  margin-top: ${rem(7)};
`;

function Category() {
  const setFilteredPosts = useSetRecoilState<Posts>(posts);
  const introSearch = useRecoilValue<Posts>(originalPosts);
  const onAllClick = () => {
    setFilteredPosts(introSearch);
  };

  const onPackageClick = () => {
    const filtered = introSearch.posts.filter(
      (obj) => obj.category === '패키지',
    );
    setFilteredPosts({ posts: filtered });
  };

  const onTentClick = () => {
    const filtered = introSearch.posts.filter(
      (obj) => obj.category === '텐트/침낭',
    );
    setFilteredPosts({ posts: filtered });
  };

  const onGrillClick = () => {
    const filtered = introSearch.posts.filter(
      (obj) => obj.category === '그릴/버너',
    );
    setFilteredPosts({ posts: filtered });
  };
  const onChairClick = () => {
    const filtered = introSearch.posts.filter(
      (obj) => obj.category === '의자/테이블',
    );
    setFilteredPosts({ posts: filtered });
  };
  const onBagClick = () => {
    const filtered = introSearch.posts.filter(
      (obj) => obj.category === '배낭/아이스박스',
    );
    setFilteredPosts({ posts: filtered });
  };
  const onPotClick = () => {
    const filtered = introSearch.posts.filter(
      (obj) => obj.category === '취식용품',
    );
    setFilteredPosts({ posts: filtered });
  };
  const onEtcClick = () => {
    const filtered = introSearch.posts.filter((obj) => obj.category === '기타');
    setFilteredPosts({ posts: filtered });
  };

  return (
    <ul css={ulStyle}>
      <li key="all" css={categoryStyle} onClick={onAllClick}>
        <img
          src={categoryAll}
          alt="all products"
          css={[img, `margin-top: ${rem(28)}`]}
        />
        <div css={[text, `margin-top: ${rem(2)}`]}>전체</div>
      </li>
      <li key="Package" css={categoryStyle} onClick={onPackageClick}>
        <img src={categoryPack} alt="all products" css={img} />
        <div css={[text, `margin-top: ${rem(1)}`]}>패키지</div>
      </li>
      <li key="Tent" css={categoryStyle} onClick={onTentClick}>
        <img src={categoryTent} alt="tent" css={img} />
        <div>텐트/침낭</div>
      </li>
      <li key="Grill" css={categoryStyle} onClick={onGrillClick}>
        <img
          src={categoryFire}
          alt="grill/burner"
          css={[img, `margin-top: ${rem(28)}`]}
        />
        <div css={text}>그릴/버너</div>
      </li>
      <li key="Chair" css={categoryStyle} onClick={onChairClick}>
        <img src={categoryChair} alt="camping chair/table" css={img} />
        <div css={[text, `margin-top: ${rem(1)}`]}>의자/테이블</div>
      </li>
      <li key="Bag" css={categoryStyle} onClick={onBagClick}>
        <img src={categoryBag} alt="bag/ice-box/portable-fridge" css={img} />
        <div css={text}>배낭/아이스박스</div>
      </li>
      <li key="Pot" css={categoryStyle} onClick={onPotClick}>
        <img src={categoryPot} alt="pot/kettle/..." css={img} />
        <div css={[text, `margin-top: ${rem(4)}`]}>취식용품</div>
      </li>
      <li key="Etc" css={categoryStyle} onClick={onEtcClick}>
        <img src={categoryETC} alt="etc..." css={img} />
        <div css={[text, `margin-top: ${rem(5)}`]}>기타</div>
      </li>
    </ul>
  );
}

export default Category;
