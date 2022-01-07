/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { color, modalBackgroundStyle, rem, shadow } from '../common';
import { Button } from './Button';
import Input from './Input';
import naver from '../assets/naver.png';
import kakao from '../assets/kakao.png';
import { useRecoilState } from 'recoil';
import { showLoginModal, showSignupModal } from '../Atom';

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
const marginTop17 = css`
  margin-top: ${rem(17)};
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

function LoginModal() {
  const [showLogin, setShowLogin] = useRecoilState(showLoginModal);
  const [showSignup, setShowSignup] = useRecoilState(showSignupModal);
  console.log('showlogin', showLogin);
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
            />
          </div>
          <div css={marginTop6}>
            <Input
              width={205}
              height={40}
              borderRadius={5}
              placeholder="비밀번호를 입력해주세요."
              fontSize={12}
            />
          </div>
          <div css={marginTop17}>
            <Button
              text="로그인"
              width={rem(205)}
              height={rem(40)}
              background={color.point}
              color={color.white}
              border="none"
              size={rem(12)}
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
          <button css={[oauth]}>
            <img css={oauthIcon} src={naver} alt="naver login" />
            <div>네이버로 로그인하기</div>
          </button>
          <button css={[oauth, marginTop6]}>
            <img css={oauthIcon} src={kakao} alt="naver login" />
            <div>카카오로 로그인하기</div>
          </button>
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
