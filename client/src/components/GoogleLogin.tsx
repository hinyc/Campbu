import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { isLogin, loginUserInfo, showLoginModal } from '../Atom';
import { host } from '../common';

export default function GoogleLogin() {
  const setShowLogin = useSetRecoilState(showLoginModal);
  const setIsLogin = useSetRecoilState(isLogin);
  const [accessToken, setAccessToken] = useState('');
  const navigate = useNavigate();
  const setLoginUserInfo = useSetRecoilState(loginUserInfo);
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
          console.log(res);
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

            localStorage.setItem('isLogin', 'true');
            localStorage.setItem('userInfo', JSON.stringify(userinfo));
            console.log(res);
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
