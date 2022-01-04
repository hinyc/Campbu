/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { rem } from '../common';

const box = css`
  width: ${rem(205)};
  height: ${rem(284)};
  border: 1px solid black;
  border-radius: ${rem(10)};
  position: absolute;
  top: ${rem(99)};
  right: 0;
  background-color: white;
  z-index: 999;
`;

const ulStyle = css`
  list-style: none;
  padding: 0;
`;

const lineStyle = css`
  border: 1px solid black;
`;

function ProfileDropdown() {
  return (
    <div css={box}>
      <ul css={ulStyle}>
        <li>
          <Link to="borrowlist">빌린 목록</Link>
        </li>
        <li>
          <Link to="lendlist">빌려준 목록</Link>
        </li>
        <li>
          <Link to="likelist">찜한 목록</Link>
        </li>
        <li>
          <Link to="resistlist">내가 쓴 글</Link>
        </li>
        <div css={lineStyle} />
        <li>
          <Link to="/mypage">계정</Link>
        </li>
        <li>로그아웃</li>
      </ul>
    </div>
  );
}

export default ProfileDropdown;
