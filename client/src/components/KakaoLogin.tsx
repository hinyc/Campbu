import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function KakaoLogin() {
  const navigate = useNavigate();
  const con = () => {
    console.log(123124);
    navigate('/');
  };
  con();
  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');
    console.log(authorizationCode);
    if (authorizationCode) {
      getAccessToken(authorizationCode);
    }
  }, []);

  const getAccessToken = (authorizationCode: string) => {
    axios
      .post('http://localhost:5050/user/kakao', { authorizationCode })
      .then((res) => {});
  };
  return <div onClick={con}></div>;
}
