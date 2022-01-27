/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { color, host, rem, shadow } from '../common';
import FillHeart from '../assets/FillHeart.svg';
import EmptyHeart from '../assets/EmptyHeart.svg';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { isLogin, jwtToken, showLoginModal } from '../Atom';
import axios from 'axios';

const like = css`
  color: ${color.point};
  background-color: ${color.white};
  font-size: ${rem(18)};
  width: ${rem(83)};
  height: ${rem(42)};
  border: 1px solid ${color.white};
  border-radius: ${rem(22)};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${shadow};
`;

const heart = css`
  border: none;
  background-color: rgba(0, 0, 0, 0);
  margin-right: ${rem(5)};
  cursor: pointer;
`;
interface LikeProps {
  isFill: boolean;
  count: number;
  width?: number | undefined;
  height?: number | undefined;
  fontSize?: number | undefined;
  borderColor?: string | undefined;
  display?: string | undefined;
  postId: number;
}

function LikeSymbol(props: LikeProps) {
  const {
    isFill,
    count,
    width,
    height,
    fontSize,
    borderColor,
    display,
    postId,
  } = props;

  const setShowLoginModal = useSetRecoilState(showLoginModal);
  const loginUser = useRecoilValue<boolean>(isLogin);
  const [fillHeart, setFillHeart] = useState<boolean>(isFill);
  const [countHeart, setCountHeart] = useState<number>(count);
  const token = useRecoilValue(jwtToken);

  useEffect(() => {
    setFillHeart(isFill);
    setCountHeart(count);
  }, [count, isFill]);

  const onHeartClick = () => {
    if (loginUser) {
      axios
        .post(
          `${host}/user/like`,
          { post_id: postId },
          {
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          },
        )
        .then((res) => {
          if (res.status === 201) {
            if (fillHeart) {
              setCountHeart(countHeart - 1);
              setFillHeart(!fillHeart);
            } else {
              setCountHeart(countHeart + 1);
              setFillHeart(!fillHeart);
            }
          }
        })
        .catch((e) => console.error(e));
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <div
      css={[
        like,
        css`
          width: ${width ? rem(width) : null};
          height: ${height ? rem(height) : null};
          font-size: ${fontSize ? rem(fontSize) : null};
          border-color: ${borderColor ? borderColor : null};
          display: ${display ? display : 'flex'};
        `,
      ]}
      onClick={onHeartClick}
    >
      <button css={heart}>
        <img
          width={fontSize ? fontSize * 0.9 : 14}
          src={fillHeart ? FillHeart : EmptyHeart}
          alt="fill heart"
          draggable="false"
        />
      </button>
      <span>{loginUser ? countHeart : count}</span>
    </div>
  );
}
export default LikeSymbol;
