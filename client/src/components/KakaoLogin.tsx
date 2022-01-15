import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function KakaoLogin() {
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [userInfo, setUserInfo] = useState();
  const navigate = useNavigate();
  const con = () => {
    navigate('/');
  };
  con();
  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');
    if (authorizationCode) {
      getAccessToken(authorizationCode);
    }
    return () => {};
  }, []);

  useEffect(() => {
    console.log('getuserinfo');
    getUserInfo(accessToken);
    return () => {};
  }, [accessToken]);

  const getAccessToken = async (authorizationCode: unknown) => {
    await axios
      .post('http://localhost:5050/user/kakao', { authorizationCode })
      .then((res) => {
        console.log('accessToken: ', res.data.access_token);
        console.log('refreshToken: ', res.data.refresh_token);
        setAccessToken(res.data.access_token);
        if (!refreshToken) {
          console.log('담기는지', res.data.refresh_token);
          setRefreshToken(res.data.refresh_token);
        }
        console.log('액세스토큰', res.data.access_token);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getUserInfo = async (accessToken: unknown) => {
    console.log('location');
    if (accessToken !== '') {
      await axios
        .get(`http://localhost:5050/user/kakao/${accessToken}`)
        .then((res) => {
          console.log(res);
        });
    }
  };
  return <div onClick={con}></div>;
}
