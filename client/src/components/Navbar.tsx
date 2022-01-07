/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.svg';
import Menu from '../assets/Menu.svg';
import Profile from '../assets/Profile.svg';
import { color, rem, shadow } from '../common';
import { Button } from './Button';
import ProfileDropdown from './ProfileDropdown';

const headerStyle = css`
  height: ${rem(99)};
  display: flex;
  justify-content: space-between;
  max-width: ${rem(1280)};
  margin: 0 auto;
  align-items: center;
  position: relative;
  z-index: 999;
`;

function Navbar() {
  const [click, setClick] = useState<boolean>(false);
  const onClick = () => {
    setClick(!click);
  };

  return (
    <header css={headerStyle}>
      <Link to="/">
        <img src={Logo} className="CampBu-logo" alt="logo" />
      </Link>
      {click ? (
        <Button
          text="Login"
          width={`${rem(83)}`}
          height={`${rem(36)}`}
          background={`${color.point}`}
          color="white"
          border="none"
          size={`${rem(14)}`}
          hoverBackground="#F18556"
          cursor="pointer"
          onClick={onClick}
        />
      ) : (
        <>
          <Button
            width={`${rem(83)}`}
            height={`${rem(36)}`}
            background={`${color.point}`}
            color="white"
            border="none"
            size={`${rem(13)}`}
            cursor="pointer"
            onClick={onClick}
            shadow={`${shadow}`}
            hoverBackground="#F18556"
          >
            <img
              src={Menu}
              className="CampBu-logo"
              alt="logo"
              style={{ margin: `0 ${rem(14)} ${rem(2)} 0` }}
            />
            {/* //! 프로필 사진이 들어가야 함 */}
            <img
              style={{ marginTop: rem(2) }}
              src={Profile}
              className="CampBu-logo"
              alt="logo"
            />
          </Button>

          <ProfileDropdown />
        </>
      )}
    </header>
  );
}

export default Navbar;
