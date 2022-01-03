/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';
import React, { useState } from 'react';
import Logo from '../assets/Logo.svg';
import Menu from '../assets/Menu.svg';
import Profile from '../assets/Profile.svg';

const headerStyle = css`
  background-color: blanchedalmond;
  display: flex;
  justify-content: flex-end;
`;

const imgStyle = css`
  margin-right: auto;
  margin-left: 12.75rem;
`;

const loginStyle = css`
  margin-right: 12.75rem;
`;

function Navbar() {
  const [click, setClick] = useState<boolean>(false);
  const onClick = () => {
    setClick(!click);
  };

  return (
    <header css={headerStyle}>
      <img src={Logo} className="CampBu-logo" alt="logo" css={imgStyle} />
      {click ? (
        <button css={loginStyle} onClick={onClick}>
          Login
        </button>
      ) : (
        <button css={loginStyle} onClick={onClick}>
          <img src={Menu} className="CampBu-logo" alt="logo" />
          <img src={Profile} className="CampBu-logo" alt="logo" />
        </button>
      )}
    </header>
  );
}

export default Navbar;
