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
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { originalPosts, posts, selectCategory } from '../Atom';
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: 0.1s;
  :hover {
    box-shadow: ${hover};
    border: 2px solid ${color.deep};
    background-color: white;
    transition: 0.1s;
  }
  :active {
    opacity: 0.65;
  }
`;
const selectStyle = css`
  box-shadow: ${hover};
  border: 2px solid ${color.deep};
  background-color: white;
`;

const img = css`
  display: inline-block;
  margin: 1.3rem auto 0 auto;
  height: ${rem(63)};
`;

const text = css`
  height: ${rem(20)};
  margin-bottom: ${rem(7)};
`;

function Category() {
  const setFilteredPosts = useSetRecoilState<Posts>(posts);
  const introSearch = useRecoilValue<Posts>(originalPosts);
  const [select, setSelect] = useRecoilState(selectCategory);

  const selectCategoryHandler = (title: string) => {
    if (title === '전체') {
      setFilteredPosts(introSearch);
    } else {
      const filtered = introSearch.posts.filter(
        (obj) => obj.category === title,
      );
      setFilteredPosts({ posts: filtered });
    }
    setSelect(title);
    localStorage.setItem('category', title);
  };

  const catergorys = [
    {
      key: 'all',
      title: '전체',
      img: categoryAll,
      alt: 'all products',
    },
    {
      key: 'Package',
      title: '패키지',
      img: categoryPack,
      alt: 'all products',
    },
    {
      key: 'Tent',
      title: '텐트/침낭',
      img: categoryTent,
      alt: 'tent',
    },
    {
      key: 'Grill',
      title: '그릴/버너',
      img: categoryFire,
      alt: 'grill/burner',
    },
    {
      key: 'Chair',
      title: '의자/테이블',
      img: categoryChair,
      alt: 'camping chair/table',
    },
    {
      key: 'Bag',
      title: '배낭/아이스박스',
      img: categoryBag,
      alt: 'bag/ice-box/portable-fridge',
    },
    {
      key: 'Pot',
      title: '취식용품',
      img: categoryPot,
      alt: 'pot/kettle/...',
    },
    {
      key: 'Etc',
      title: '기타',
      img: categoryETC,
      alt: 'etc...',
    },
  ];

  return (
    <ul css={ulStyle}>
      {catergorys.map((el) => {
        return (
          <li
            key={el.key}
            css={[categoryStyle, el.title === select ? selectStyle : null]}
            onClick={() => {
              selectCategoryHandler(el.title);
            }}
          >
            <img draggable="false" src={el.img} alt={el.alt} css={[img]} />
            <div css={[text]}>{el.title}</div>
          </li>
        );
      })}
    </ul>
  );
}

export default Category;
