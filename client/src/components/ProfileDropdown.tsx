/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { color, rem, shadow, textDecorationNone } from '../common';

const box = css`
  width: ${rem(205)};
  height: ${rem(284)};
  border-radius: ${rem(10)};
  position: absolute;
  top: ${rem(83)};
  right: 0;
  background-color: white;
  z-index: 999;
  box-shadow: ${shadow};
`;

const ulStyle = css`
  list-style: none;
  padding: 0;
  font-size: ${rem(16)};
  margin: ${rem(18)} 0;
`;

const li = css`
  color: black;
  margin: ${rem(22)} 0 0 ${rem(19)};
  :visited {
    color: black;
  }
`;

function ProfileDropdown() {
  return (
    <div css={box}>
      <ul css={ulStyle}>
        <li css={li}>
          <Link to="/lists/borrowlist" css={textDecorationNone}>
            빌린 목록
          </Link>
        </li>
        <li css={li}>
          <Link to="/lists/lendlist" css={textDecorationNone}>
            빌려준 목록
          </Link>
        </li>
        <li css={li}>
          <Link to="/lists/likelist" css={textDecorationNone}>
            찜한 목록
          </Link>
        </li>
        <li css={[li, `margin-bottom: ${rem(22)}`]}>
          <Link to="/lists/resistlist" css={textDecorationNone}>
            내가 쓴 글
          </Link>
        </li>
        <div style={{ border: '1px solid #f0f0f0' }} />
        <li css={li}>
          <Link to="mypage" css={textDecorationNone}>
            계정
          </Link>
        </li>
        <li css={li}>로그아웃</li>
      </ul>
    </div>
  );
}

export default ProfileDropdown;
