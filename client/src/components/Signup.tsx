/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { setegid } from 'process';
import { useState } from 'react';
import { constSelector, useRecoilState } from 'recoil';
import { showSignupModal } from '../Atom';
import {
  color,
  rem,
  shadow,
  hover,
  modalBackgroundStyle,
  flex,
  flexBetween,
} from '../common';
import { Button } from './Button';
import Input from './Input';

const backgroundStyle = css`
  background-color: white;
  width: ${rem(334)};
  /* height: 28.125rem; */
  height: ${rem(450)};
  border-radius: ${rem(15)};
  box-shadow: ${shadow};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${rem(12)};
  position: relative;
`;
const wnr = css`
  width: ${rem(205)};
  border-radius: ${rem(5)};
`;
const verticalAlign = css`
  display: flex;
  flex-direction: column;
`;

const inputStyle = css`
  height: ${rem(38)};
  border: 1px solid ${color.border};
  /* position: absolute; */
  padding-left: ${rem(12)};
  font-size: ${rem(12)};
  ::placeholder {
    color: ${color.placeholder};
  }
`;

const contentAlign = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* position: absolute; */
`;
const checkStyle = css`
  top: ${rem(353)};
  /* position: absolute; */
  display: flex;
  justify-content: center;
`;
const buttonStyle = css`
  border: none;
  height: ${rem(40)};
  color: ${color.white};
  background-color: ${color.point};
  font-size: ${rem(12)};
  :hover {
    box-shadow: ${hover};
  }
`;

const see = css`
  font-size: ${rem(10)};
  width: ${rem(41)};
  height: ${rem(21)};
  line-height: ${rem(21)};
`;

const validButtonInactive = css`
  color: ${color.border};
  pointer-events: none;
  font-weight: 700;
  :hover {
    color: ${color.point};
  }
`;
const validButtonActive = css`
  color: ${color.point};
  font-weight: 700;
  :hover {
    color: ${color.point};
    cursor: pointer;
  }
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

const marginTop12 = css`
  margin-top: ${rem(12)};
`;
const marginTop6 = css`
  margin-top: ${rem(6)};
`;
const alignItemCenter = css`
  align-items: center;
`;
const alignItemFlexEnd = css`
  align-items: center;
`;

const noticeOk = css`
  font-size: ${rem(10)};
  color: ${color.mid};
`;
const noticeNo = css`
  font-size: ${rem(10)};
  color: ${color.point};
`;

const alignLeft = css`
  width: ${rem(113)};
  text-align: left;
  margin-left: ${rem(13.5)};
`;

function Signup() {
  const [signupModal, setSignupModal] = useRecoilState(showSignupModal);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const [nickDupliacte, setNickDupliacte] = useState(false);
  const [emailDupliacte, setEmailDupliacte] = useState(false);

  const nicknameHandler = (e: any) => {
    setNickname(e.target.value);
    if (nickDupliacte) {
      setNickDupliacte(false);
    }
  };
  const emailHandler = (e: any) => {
    const email = e.target.value;
    setEmail(email);
    const emailValidator =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    setEmailValid(emailValidator.test(email));
  };
  const passwordHandler = (e: any) => {
    const password = e.target.value;
    setPassword(password);
    const passwordValidator = /(?=.*[0-9])(?=.*[A-Za-z]).{8,}/g;
    setPasswordValid(passwordValidator.test(password));
  };

  const confirmPasswordHandler = (e: any) => setConfirmPassword(e.target.value);

  const nicknameDuplicateCheckHandler = () => {
    console.log('닉네임중복확인함수실행');
    console.log('닉네임 사용가능');
    setNickDupliacte(true);
  };
  const emailDuplicateCheckHandler = () => {
    console.log('이메일중복확인함수실행');
    console.log('이메일 사용가능');
    setEmailDupliacte(true);
  };

  return (
    <div css={modalBackgroundStyle}>
      <div className="Singup" css={backgroundStyle}>
        <div css={x} onClick={() => setSignupModal(false)}>
          &times;
        </div>
        <div css={[verticalAlign]}>
          <div css={[flexBetween, alignItemFlexEnd]}>
            <span>닉네임</span>
            <div
              css={css`
                margin-left: ${rem(5)};
              `}
            >
              {nickname.length > 0 && nickDupliacte ? (
                <div css={noticeOk}> * 사용가능한 닉네임입니다.</div>
              ) : null}
            </div>
            <span
              css={
                nickname.length > 0 ? validButtonActive : validButtonInactive
              }
              onClick={nicknameDuplicateCheckHandler}
            >
              중복 검사
            </span>
          </div>
          <div css={marginTop6}>
            <Input
              width={205}
              height={38}
              fontSize={12}
              onChange={nicknameHandler}
              value={nickname}
              type="text"
              placeholder="닉네임을 입력해주세요."
            />
          </div>
          <div css={[flexBetween, marginTop12, alignItemFlexEnd]}>
            <span>이메일</span>
            <div css={alignLeft}>
              {email.length > 0 ? (
                emailValid ? (
                  <span css={noticeOk}>* 사용 가능한 이메일 입니다.</span>
                ) : (
                  <span css={noticeNo}>* 이메일 형식을 지켜주세요.</span>
                )
              ) : null}
            </div>
            <span
              css={emailValid ? validButtonActive : validButtonInactive}
              onClick={emailDuplicateCheckHandler}
            >
              중복 검사
            </span>
          </div>
          <div css={marginTop6}>
            <Input
              width={205}
              height={38}
              fontSize={12}
              onChange={emailHandler}
              value={email}
              type="text"
              placeholder="이메일을 입력해주세요."
            />
          </div>
          <div css={marginTop12}>
            <div css={[flex, alignItemFlexEnd]}>
              <div>비밀번호</div>
              <div
                css={css`
                  margin-left: ${rem(4)};
                `}
              >
                {confirmPassword.length > 0 && passwordValid ? (
                  password === confirmPassword ? (
                    <div css={noticeOk}>* 비밀번호가 일치합니다.</div>
                  ) : (
                    <div css={noticeNo}>* 비밀번호가 일치하지 않습니다.</div>
                  )
                ) : password.length > 0 ? (
                  passwordValid ? (
                    <div css={noticeOk}>* 사용가능한 비밀번호입니다.</div>
                  ) : (
                    <div css={noticeNo}>
                      * 영문, 숫자 조합 8자 이상 입력해주세요.{' '}
                    </div>
                  )
                ) : null}
              </div>
            </div>
          </div>
          <div css={marginTop6}>
            <Input
              width={205}
              height={38}
              fontSize={12}
              onChange={passwordHandler}
              value={password}
              type="text"
              placeholder="비밀번호를 입력해주세요."
            />
          </div>
          <div css={marginTop6}>
            <Input
              width={205}
              height={38}
              fontSize={12}
              onChange={confirmPasswordHandler}
              value={confirmPassword}
              type="text"
              placeholder="비밀번호를 한 번 더입력해주세요."
            />
          </div>

          <div css={[flexBetween, marginTop12, alignItemCenter]}>
            <span>이용약관</span>
            <Button
              text="보기"
              width={rem(41)}
              height={rem(21)}
              background={color.point}
              color={color.white}
              border="none"
              size={rem(10)}
            />
          </div>
          <div css={[flexBetween, marginTop6, alignItemCenter]}>
            <span>이용약관</span>
            <Button
              text="보기"
              width={rem(41)}
              height={rem(21)}
              background={color.point}
              color={color.white}
              border="none"
              size={rem(10)}
            />
          </div>
          <div css={[checkStyle, marginTop12]}>
            <input
              css={css`
                width: 0.8125rem;
                height: 0.8125rem;
                margin-right: 0.5625rem;
              `}
              type="checkbox"
            />
            <span>{`모든 이용약관에 동의합니다.`}</span>
          </div>
          <div css={marginTop12}>
            <Button
              text="회원가입"
              width={rem(205)}
              height={rem(40)}
              background={
                nickDupliacte &&
                emailDupliacte &&
                passwordValid &&
                password === confirmPassword
                  ? color.point
                  : color.border
              }
              color={color.white}
              border="none"
              size={rem(12)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
