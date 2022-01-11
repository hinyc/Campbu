/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { borrows, lends, likes, resists } from '../Atom';
import { rem, shadow, textDecorationNone } from '../common';
import {
  onResistClick,
  onLikeClick,
  onLendClick,
  onBorrowClick,
} from '../pages/Lists/axios';

const box = css`
  width: ${rem(205)};
  border-radius: ${rem(10)};
  position: absolute;
  top: ${rem(83)};
  right: 0;
  background-color: white;
  box-shadow: ${shadow};
`;

const ulStyle = css`
  list-style: none;
  padding: 0;
  font-size: ${rem(16)};
  margin: ${rem(14)} 0 ${rem(8)} 0;
`;

const li = css`
  color: black;
  padding: ${rem(11)} 0 ${rem(11)} ${rem(19)};
  :hover {
    background-color: #f0f0f0;
  }
`;

const line = css`
  border: 1px solid #f0f0f0;
  margin: ${rem(5)} 0;
`;

function ProfileDropdown() {
  const setBorrowList = useSetRecoilState(borrows);
  const setLendList = useSetRecoilState(lends);
  const setLikeList = useSetRecoilState(likes);
  const setResistList = useSetRecoilState(resists);
  return (
    <div css={box}>
      <ul css={ulStyle}>
        <Link to="/lists/borrowlist" css={textDecorationNone}>
          <li
            css={li}
            onClick={() => {
              // const result = onBorrowClick();
              // console.log('result', result)
              // setResistList(result);
            }}
          >
            빌린 목록
          </li>
        </Link>
        <Link to="/lists/lendlist" css={textDecorationNone}>
          <li
            css={li}
            onClick={() => {
              // const result = onLendClick();
              // console.log('result', result)
              // setResistList(result);
            }}
          >
            빌려준 목록
          </li>
        </Link>
        <Link to="/lists/likelist" css={textDecorationNone}>
          <li
            css={li}
            onClick={() => {
              // const result = onLikeClick();
              // console.log('result', result)
              // setResistList(result);
            }}
          >
            찜한 목록
          </li>
        </Link>
        <Link to="/lists/resistlist" css={textDecorationNone}>
          <li
            css={li}
            onClick={() => {
              // const result = onResistClick();
              // console.log('result', result)
              // setResistList(result);
            }}
          >
            내가 쓴 글
          </li>
        </Link>
        <div css={line} />
        <Link to="mypage" css={textDecorationNone}>
          <li css={li}>계정</li>
        </Link>
        <li css={li}>로그아웃</li>
      </ul>
    </div>
  );
}

export default ProfileDropdown;
