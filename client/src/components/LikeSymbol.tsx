/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { color, rem } from '../common';
import FillHeart from '../assets/FillHeart.svg';
import EmptyHeart from '../assets/EmptyHeart.svg';
import { useState } from 'react';

const like = css`
  color: ${color.point};
  background-color: ${color.white};
  font-size: ${rem(18)};
  width: ${rem(83)};
  height: ${rem(42)};
  border: 1px solid ${color.white};
  border-radius: ${rem(22)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const heart = css`
  border: none;
  background-color: rgba(0, 0, 0, 0);
  margin-right: ${rem(5)};
`;
interface LikeProps {
  isFill: boolean;
  count: number;
  width?: number | undefined;
  height?: number | undefined;
  fontSize?: number | undefined;
  borderColor?: string | undefined;
}

function LikeSymbol(props: LikeProps) {
  const { isFill, count, width, height, fontSize, borderColor } = props;
  const [fillHeart, setFillHeart] = useState<boolean>(isFill);
  const [countHeart, setCountHeart] = useState<number>(count);
  const onHeartClick = () => {
    setFillHeart(!fillHeart);
    if (fillHeart === true) {
      setCountHeart(countHeart - 1);
    } else {
      setCountHeart(countHeart + 1);
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
        `,
      ]}
    >
      <button css={heart} onClick={onHeartClick}>
        {fillHeart ? (
          <img
            width={fontSize ? fontSize * 0.9 : 14}
            src={FillHeart}
            alt="fill heart"
          />
        ) : (
          <img
            width={fontSize ? fontSize * 0.9 : 14}
            src={EmptyHeart}
            alt="empty heart"
          />
        )}
      </button>
      <span>{countHeart}</span>
    </div>
  );
}
export default LikeSymbol;
