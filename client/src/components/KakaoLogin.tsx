import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function KakaoLogin() {
  const navigate = useNavigate();
  const con = () => {
    console.log(123124);
    navigate('/');
  };
  con();
  const code = new URL(window.location.href).searchParams.get('code');
  return <div onClick={con}>{code}</div>;
}
