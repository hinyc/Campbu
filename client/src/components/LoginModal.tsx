/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { color, host, modalBackgroundStyle, rem, shadow } from '../common';
import { Button } from './Button';
import Input from './Input';
import naverimg from '../assets/naver.png';
import kakaoimg from '../assets/kakao.png';
import { useSetRecoilState } from 'recoil';
import { isLogin, showLoginModal, showSignupModal } from '../Atom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import KakaoLogin from './KakaoLogin';

const backgroundStyle = css`
  background-color: white;
  width: ${rem(334)};
  height: ${rem(413)};
  border-radius: ${rem(15)};
  box-shadow: ${shadow};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: ${rem(12)};
  position: relative;
`;

const x = css`
  font-size: ${rem(14)};
  width: ${rem(18)};
  height: ${rem(18)};
  line-height: ${rem(18)};
  text-align: center;
  color: ${color.placeholder};
  top: ${rem(14)};
  right: ${rem(12)};
  position: absolute;
  :hover {
    font-size: ${rem(18)};
    cursor: pointer;
  }
`;

const oauth = css`
  border: 1px solid ${color.border};
  border-radius: ${rem(5)};
  background-color: ${color.white};
  width: ${rem(205)};
  height: ${rem(40)};
  font-size: ${rem(12)};
  position: relative;
  transition: 0.1s;
  :hover {
    opacity: 0.5;
  }
  :active {
    opacity: 95%;
  }
`;
const oauthIcon = css`
  width: ${rem(19)};
  height: ${rem(19)};
  position: absolute;
  left: ${rem(15)};
  top: ${rem(9.5)};
`;

const marginTop6 = css`
  margin-top: ${rem(6)};
`;

const topLine = css`
  width: ${rem(205)};
  border: 1px solid ${color.border};
  border-style: solid none none none;
  margin-top: ${rem(20)};
  padding-top: ${rem(20)};
  position: relative;
`;
const floatingTextBox = css`
  width: ${rem(205)};
  display: flex;
  justify-content: center;
`;
const floatingText = css`
  text-align: center;
  position: absolute;
  background-color: ${color.white};
  color: ${color.placeholder};
  font-size: ${rem(10)};
  line-height: ${rem(10)};
  top: ${rem(-5)};
`;

const reqMsg = css`
  height: ${rem(18)};
  line-height: ${rem(18)};
  font-size: ${rem(10)};
  color: ${color.point};
  margin-left: ${rem(12)};
`;

function LoginModal() {
  const setShowLogin = useSetRecoilState(showLoginModal);
  const setIsLogin = useSetRecoilState(isLogin);

  const setShowSignup = useSetRecoilState(showSignupModal);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailReqMsg, setEmailReqMsg] = useState(false);
  const [passwordReqMsg, setPasswordReqMsg] = useState(false);

  const navigate = useNavigate();

  const emailHandler = (e: any) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e: any) => {
    setPassword(e.target.value);
  };

  const loginHandler = () => {
    interface loginType {
      email: string;
      password: string;
    }

    const loginInfo: loginType = {
      email,
      password,
    };

    if (!email) return setEmailReqMsg(true);
    if (!password) {
      setEmailReqMsg(false);
      setPasswordReqMsg(true);
      return;
    }

    axios
      .post(`${host}/user/login`, loginInfo, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log('로그인성공');
          setShowLogin(false);
          setIsLogin(true);
          navigate('/');
          return;
        }
      })
      .catch((res) => {
        console.log(res);
        setPasswordReqMsg(false);
        console.log(passwordReqMsg);
      });
  };

  const kakaoLogin = () => {
    console.log('카카오 로그인요청');
    //   window.Kakao.Auth.login({
    //     success: ,
    //     scope:
    // //   })
  };
  const naverLogin = () => {
    console.log('네이버로그인요청');
  };

  const REST_API_KEY = '743967a98f800a0d61397559fbf5ad5f';
  const REDIRECT_URI = 'http://localhost:3000/oauth/kakao/callback';
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <div css={modalBackgroundStyle}>
      <div css={backgroundStyle}>
        <div css={x} onClick={() => setShowLogin(false)}>
          &times;
        </div>
        <div className="login">
          <div>
            <Input
              width={205}
              height={40}
              borderRadius={5}
              placeholder="이메일을 입력해주세요."
              fontSize={12}
              onChange={emailHandler}
              value={email}
            />
          </div>
          <div css={marginTop6}>
            <Input
              width={205}
              height={40}
              borderRadius={5}
              placeholder="비밀번호를 입력해주세요."
              fontSize={12}
              onChange={passwordHandler}
              value={password}
              type="password"
            />
          </div>
          <div css={reqMsg}>
            {emailReqMsg ? <div>* 이메일을 입력해주세요.</div> : null}
            {passwordReqMsg ? <div>* 비밀번호를 입력해주세요.</div> : null}
          </div>

          <div>
            <Button
              text="로그인"
              width={rem(205)}
              height={rem(40)}
              background={color.point}
              color={color.white}
              border="none"
              size={rem(12)}
              hover=".85"
              onClick={loginHandler}
            />
          </div>
        </div>
        <div className="OAuth" css={topLine}>
          <div css={floatingTextBox}>
            <div
              css={[
                floatingText,
                css`
                  width: ${rem(25)};
                `,
              ]}
            >
              또는
            </div>
          </div>
          <button css={[oauth]} onClick={naverLogin}>
            <img css={oauthIcon} src={naverimg} alt="naver login" />
            <div>네이버로 로그인하기</div>
          </button>
          <a href={KAKAO_AUTH_URL}>
            <button css={[oauth, marginTop6]} onClick={kakaoLogin}>
              <img css={oauthIcon} src={kakaoimg} alt="naver login" />
              <div>카카오로 로그인하기</div>
            </button>
          </a>
        </div>
        <div className="singUp" css={topLine}>
          <div css={floatingTextBox}>
            <div
              css={[
                floatingText,
                css`
                  width: ${rem(75)};
                `,
              ]}
            >
              회원이 아니라면?
            </div>
          </div>
          <Button
            text="회원가입"
            width={rem(205)}
            height={rem(40)}
            background={color.white}
            color={color.point}
            border={`1px solid ${color.point}`}
            size={rem(12)}
            fontWeight={700}
            hover=".7"
            onClick={() => {
              setShowSignup(true);
              setShowLogin(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
