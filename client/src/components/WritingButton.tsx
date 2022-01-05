/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Pencil from '../assets/Pencil.svg';
import { useNavigate } from 'react-router-dom';
import { rem } from '../common';

const buttonStyle = css`
  width: ${rem(63)};
  height: ${rem(63)};
  position: sticky;
  bottom: 1rem;
  float: right;
  border: 1px solid black;
  border-radius: ${rem(50)};
`;

function WritingButton() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/writing');
  };

  return (
    <button css={buttonStyle} onClick={onClick}>
      <img src={Pencil} alt="writing button" />
    </button>
  );
}

export default WritingButton;
