/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { rem, color, hover } from '../common';
import Alert from '../assets/Alert.svg';
import { Button } from './Button';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { showAlertModal } from '../Atom';

const box = css`
  position: fixed;
  width: ${rem(234)};
  background-color: white;
  border-radius: ${rem(15)};
  box-shadow: ${hover};
  z-index: 999;
  left: 50%;
  transform: translate(-50%, 0);
`;

const img = css`
  margin: ${rem(42)} 0 ${rem(30)} 0;
`;

const message = css`
  color: black;
  font-size: ${rem(14)};
  margin-bottom: ${rem(10)};
`;

interface Props {
  text: string;
}

function AlertModal({ text }: Props) {
  const setShowModal = useSetRecoilState(showAlertModal);
  const onClick = () => {
    setShowModal(false);
  };
  return (
    <div css={box}>
      <img src={Alert} alt="alert!" css={img} />
      <p css={message}>{text}</p>
      <Button
        text="확인"
        width={`${rem(180)}`}
        height={`${rem(43)}`}
        background={`${color.point}`}
        color={`white`}
        border="none"
        size={`${rem(14)}`}
        margin={`${rem(20)} 0`}
        hover="80%"
        cursor="pointer"
        onClick={onClick}
      />
    </div>
  );
}

export default AlertModal;
