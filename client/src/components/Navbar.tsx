/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Logo from '../assets/Logo.svg';
import Menu from '../assets/Menu.svg';
import Profile from '../assets/Profile.svg';

import {
  isLogin,
  loginUserInfo,
  post_id,
  showLoginModal,
  showSignupModal,
} from '../Atom';
import { color, rem, shadow } from '../common';

import { Button } from './Button';
import LoginModal from './LoginModal';
import ProfileDropdown from './ProfileDropdown';
import Signup from './Signup';
import { chatsNum } from '../Atom';
import io from 'socket.io-client';

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
  const [login, setIsLogin] = useRecoilState(isLogin);
  const [showLogin, setShowLogin] = useRecoilState(showLoginModal);
  const [chatNum, setChatNum] = useRecoilState(chatsNum);
  const [socket, setSocket] = useState<any>();
  const [messageDate, setMessageDate] = useState<number>(1000);
  const setLoginUserInfo = useSetRecoilState(loginUserInfo);
  const userInfo = useRecoilState(loginUserInfo);
  const setPostId = useSetRecoilState(post_id);

  const showSignup = useRecoilValue(showSignupModal);
  console.log('showLogin', showLogin);
  const onClick = () => {
    setClick(!click);
  };

  useEffect(() => {
    if (localStorage.getItem('isLogin')) {
      setIsLogin(true);
    }
    if (localStorage.getItem('userInfo')) {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        setLoginUserInfo(JSON.parse(userInfo).user);
      }
    }
  }, [setIsLogin, setLoginUserInfo]);

  useEffect(() => {
    if (localStorage.getItem('postId')) {
      const postId = localStorage.getItem('postId');
      setPostId(Number(postId));
    }
  }, [setPostId]);

  useEffect(() => {
    const newSocket = io('http://localhost:5050');
    setSocket(newSocket);
  }, [setIsLogin]);

  useEffect(() => {
    socket?.on('receive-message', (message: any) => {
      const roomId = 'Room' + String(message.id);
      const date = new Date(message.date);
      const milliSeconds = date.getMilliseconds();
      if (
        milliSeconds !== messageDate &&
        !userInfo[0].nickname &&
        userInfo[0].nickname !== message.sender
      ) {
        setMessageDate(milliSeconds);
        setChatNum((chatNum) => ({
          ...chatNum,
          total: chatNum.total + 1,
          [roomId]: chatNum[roomId] + 1,
        }));
      }
    });
  });

  return (
    <header css={headerStyle}>
      {showSignup ? <Signup /> : null}
      {showLogin ? <LoginModal /> : null}
      <Link to="/">
        <img src={Logo} className="CampBu-logo" alt="logo" />
      </Link>
      {login ? (
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
            {/* //TODO: 프로필 사진이 들어가야 함 */}
            {click || chatNum.total === 0 ? (
              <>
                <img
                  src={Menu}
                  className="CampBu-logo"
                  alt="logo"
                  style={{ margin: `0 ${rem(14)} ${rem(2)} 0` }}
                />
                <img
                  style={{ marginTop: rem(2) }}
                  src={Profile}
                  className="CampBu-logo"
                  alt="logo"
                />
              </>
            ) : (
              <div
                css={[
                  css`
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    margin-top: ${rem(3)};
                  `,
                ]}
              >
                <img
                  src={Menu}
                  className="CampBu-logo"
                  alt="logo"
                  style={{ margin: `0 ${rem(14)} ${rem(2)} 0` }}
                />
                <div
                  css={[
                    css`
                      background-color: white;
                      width: ${rem(20)};
                      height: ${rem(20)};
                      color: #ed662c;
                      border-radius: 50%;
                      font-size: ${rem(15)};
                      line-height: ${rem(20)};
                      margin-bottom: ${rem(4)};
                    `,
                  ]}
                >
                  {chatNum.total}
                </div>
              </div>
            )}
          </Button>
          {click && <ProfileDropdown />}
        </>
      ) : (
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
          onClick={() => setShowLogin(true)}
        />
      )}
    </header>
  );
}

export default Navbar;
