/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Pencil from '../assets/Pencil.svg';
import { Link } from 'react-router-dom';
import { rem, color, shadow } from '../common';

const buttonStyle = css`
  width: ${rem(70)};
  height: ${rem(70)};
  position: sticky;
  bottom: ${rem(20)};
  float: right;
  border: none;
  border-radius: ${rem(50)};
  background-color: ${color.point};
  box-shadow: ${shadow};
  :hover {
    opacity: 80%;
  }
  :active {
    opacity: 95%;
  }
`;

function WritingButton() {
  return (
    <button css={buttonStyle}>
      <Link to="/writing">
        <img src={Pencil} alt="writing button" />
      </Link>
    </button>
  );
}

export default WritingButton;
