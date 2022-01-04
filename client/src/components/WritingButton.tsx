/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Pencil from '../assets/Pencil.svg';
import { useNavigate } from 'react-router-dom';

const buttonStyle = css`
  width: 63px;
  height: 63px;
  position: fixed;
  bottom: 1rem;
  right: 12.75rem;
  border: 1px solid black;
  border-radius: 50px;
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
