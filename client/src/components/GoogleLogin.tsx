import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import {
  allChatRoomId,
  chatsNum,
  isLogin,
  jwtToken,
  loginUserInfo,
  navbarOn,
  showLoginModal,
  showModal,
} from '../Atom';
import { io } from 'socket.io-client';
import { host } from '../common';

export default function GoogleLogin() {
  const setShowLogin = useSetRecoilState(showLoginModal);
  const setIsLogin = useSetRecoilState(isLogin);
  const [accessToken, setAccessToken] = useState('');
  const navigate = useNavigate();
  const setLoginUserInfo = useSetRecoilState(loginUserInfo);
  const resetIsNavOn = useResetRecoilState(navbarOn);
  const setToken = useSetRecoilState(jwtToken);
  const setChatIds = useSetRecoilState(allChatRoomId);
  const [chatNum, setChatNum] = useRecoilState(chatsNum);
  const setIsShowModal = useSetRecoilState(showModal);

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');
    if (authorizationCode) {
      getAccessToken(authorizationCode);
    }
    return () => {};
  }, []);

  useEffect(() => {
    getUserInfo(accessToken);
    return () => {};
  }, [accessToken]);

  const getAccessToken = async (authorizationCode: unknown) => {
    await axios
      .post(
        `${host}/user/google`,
        { authorizationCode },
        { withCredentials: true },
      )
      .then((res) => {
        setAccessToken(res.data.access_token);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUserInfo = async (accessToken: unknown) => {
    if (accessToken !== '') {
      await axios
        .get(`${host}/user/google`, {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 200) {
            setShowLogin(false);
            setIsLogin(true);
            interface loginUserInfoType {
              created_at: string;
              email: string;
              id: number;
              nickname: string;
              updated_at: string;
              users_img: string;
            }

            const userinfo: loginUserInfoType = res.data.user;
            setLoginUserInfo(userinfo);
            const newToken: string = res.data.token;
            setToken(newToken);
            localStorage.setItem('token', newToken);

            localStorage.setItem('isLogin', 'true');
            localStorage.setItem('userInfo', JSON.stringify(userinfo));

            axios
              .get(`${host}/chat/chatRoom`, {
                headers: {
                  'Content-Type': 'application/json',
                  authorization: `Bearer ${newToken}`,
                },
                withCredentials: true,
              })
              .then((res: any) => {
                const chatIds = res.data.chat.map((chat: any) => {
                  const roomId = 'Room' + String(chat.id);
                  if (!(roomId in chatNum)) {
                    setChatNum((chatNum) => ({
                      ...chatNum,
                      [roomId]: 0,
                    }));
                  }
                  return chat.id;
                });
                const ids = JSON.stringify(chatIds);
                setChatIds(ids);
                io(host, {
                  query: { ids },
                });
              });
            setIsShowModal(false);
            resetIsNavOn();
            navigate('/main');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return <div></div>;
}
