/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import Logo from '../assets/Logo.svg';
import Menu from '../assets/Menu.svg';
import Profile from '../assets/Profile.svg';
import { rem } from '../common';
import ProfileDropdown from './ProfileDropdown';

const headerStyle = css`
  height: ${rem(99)};
  background-color: blanchedalmond;
  display: flex;
  justify-content: space-between;
  max-width: ${rem(1280)};
  margin: 0 auto;
  align-items: center;
  position: relative;
`;

const imgStyle = css`
  /* margin-right: auto; */
  /* margin-left: 12.75rem; */
`;

const loginStyle = css`
  /* margin-right: 12.75rem; */
`;

function Navbar() {
  const [click, setClick] = useState<boolean>(false);
  const onClick = () => {
    setClick(!click);
  };

  return (
    <div>
      <header css={headerStyle}>
        <img src={Logo} className="CampBu-logo" alt="logo" css={imgStyle} />
        {click ? (
          <button css={loginStyle} onClick={onClick}>
            Login
          </button>
        ) : (
          <>
            <button css={loginStyle} onClick={onClick}>
              <img src={Menu} className="CampBu-logo" alt="logo" />
              <img src={Profile} className="CampBu-logo" alt="logo" />
            </button>
            <ProfileDropdown />
          </>
        )}
      </header>
    </div>
  );
}

export default Navbar;
