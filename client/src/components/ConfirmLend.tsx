/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { rem, color, hover, shadow, host } from '../common';
import { Button } from './Button';
import { useState } from 'react';
import Complete from './Complete';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { jwtToken, showCompleteModal, showConfirmModal } from '../Atom';
import axios from 'axios';

const box = css`
  position: fixed;
  width: ${rem(420)};
  background-color: white;
  border-radius: ${rem(15)};
  box-shadow: ${shadow};
  z-index: 999;
  left: 50%;
  transform: translate(-50%, 0);
  text-align: left;
`;

const titleStyle = css`
  margin: ${rem(20)} ${rem(24)};
  font-size: ${rem(20)};
`;

const message = css`
  color: black;
  font-size: ${rem(14)};
  margin: ${rem(5)} ${rem(24)};
`;

interface Props {
  text: string;
  text1: string;
  text2: string;
  title: string;
  reservationId: number;
  reservation_status: number;
}

function ConfirmLend({
  text1,
  text2,
  title,
  text,
  reservationId,
  reservation_status,
}: Props) {
  const setConfirm = useSetRecoilState(showConfirmModal);
  const setComplete = useSetRecoilState(showCompleteModal);
  const token = useRecoilValue(jwtToken);
  const onOkClick = () => {
    axios
      .patch(
        `${host}/reservation/${reservationId}`,
        { reservation_status: reservation_status + 1 },
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      )
      .then((res) => {
        setComplete(true);
        setConfirm(false);
      })
      .catch((err) => console.error(err));
  };
  const onNoClick = () => {
    setConfirm(false);
  };

  return (
    <>
      <div css={box}>
        <h3 css={titleStyle}>{title}</h3>
        <p css={message}>{text1}</p>
        <p css={message}>{text2}</p>
        <Button
          text="돌아가기"
          width={`${rem(180)}`}
          height={`${rem(43)}`}
          background={`white`}
          color={`${color.point}`}
          border={`1px solid ${color.point}`}
          size={`${rem(14)}`}
          margin={`${rem(16)} ${rem(6)} ${rem(20)} ${rem(24)}`}
          hover="80%"
          cursor="pointer"
          onClick={onNoClick}
        />
        <Button
          text={text}
          width={`${rem(180)}`}
          height={`${rem(43)}`}
          background={`${color.point}`}
          color={`white`}
          border="none"
          size={`${rem(14)}`}
          margin={`${rem(16)} ${rem(24)} ${rem(20)} ${rem(6)}`}
          hover="80%"
          cursor="pointer"
          onClick={onOkClick}
        />
      </div>
    </>
  );
}

export default ConfirmLend;
