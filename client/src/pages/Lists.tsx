import { Link, Route, Routes } from 'react-router-dom';
import BorrowList from './Lists/BorrowList';
import LendList from './Lists/LendList';
import ResistList from './Lists/ResistList';
import LikeList from './Lists/LikeList';
import BackButton from '../components/BackButton';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { rem, color, flex } from '../common';

const container = css`
  width: ${rem(1280)};
  margin: 0 auto;
  height: ${rem(50)};
  align-items: center;
`;

const link = css`
  color: ${color.placeholder};
  text-decoration: none;
  margin-left: ${rem(16)};
  margin-right: ${rem(41)};
  font-weight: 400;
  font-size: ${rem(16)};
  padding: 0 0 ${rem(6)} 0;

  &:hover {
    color: ${color.deep};
    font-weight: 700;
    border-bottom: 2px solid ${color.deep};
  }
`;

function Lists() {
  return (
    <>
      <header css={[container, `margin-top: ${rem(16)}`]}>
        <Link to="/main">
          <BackButton />
        </Link>
      </header>
      <nav css={[container, flex]}>
        <Link to="borrowlist" css={link}>
          빌린 목록
        </Link>
        <Link to="lendlist" css={link}>
          빌려준 목록
        </Link>
        <Link to="resistlist" css={link}>
          내가 쓴 글
        </Link>
        <Link to="likelist" css={link}>
          찜한 목록
        </Link>
      </nav>
      <Routes>
        <Route path="borrowlist" element={<BorrowList />} />
        <Route path="lendlist" element={<LendList />} />
        <Route path="resistlist" element={<ResistList />} />
        <Route path="likelist" element={<LikeList />} />
      </Routes>
    </>
  );
}

export default Lists;
