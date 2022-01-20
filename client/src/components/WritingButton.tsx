/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Pencil from '../assets/Pencil.svg';
import { Link, useNavigate } from 'react-router-dom';
import { rem, color, shadow } from '../common';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isLogin, showLoginModal } from '../Atom';

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
    cursor: pointer;
  }
  :active {
    opacity: 95%;
  }
`;

function WritingButton() {
  const login = useRecoilValue(isLogin);
  const setShowLoginModal = useSetRecoilState(showLoginModal);
  const navigation = useNavigate();
  const goWritingPage = () => {
    if (login) {
      navigation('/writing');
    } else {
      setShowLoginModal(true);
    }
  };
  return (
    <button css={buttonStyle} onClick={goWritingPage}>
      <img src={Pencil} alt="writing button" draggable="false" />
    </button>
  );
}

export default WritingButton;
