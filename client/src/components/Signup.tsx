/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useRecoilState } from 'recoil';
import { showSignupModal } from '../Atom';
import { color, rem, shadow, hover, modalBackgroundStyle } from '../common';

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
  border-radius: ${rem(15)};
`;
const verticalAlign = css`
  display: flex;
  flex-direction: column;
`;

const inputStyle = css`
  height: ${rem(38)};
  border: 1px solid ${color.border};
  position: absolute;
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
  position: absolute;
`;
const checkStyle = css`
  top: ${rem(353)};
  position: absolute;
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

const validButton = css`
  color: ${color.border};
  :hover {
    color: ${color.point};
    font-weight: 700;
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

function Signup() {
  const [signupModal, setSignupModal] = useRecoilState(showSignupModal);

  return (
    <div css={modalBackgroundStyle}>
      <div className="Singup" css={backgroundStyle}>
        <div css={x} onClick={() => setSignupModal(false)}>
          &times;
        </div>
        <div css={[wnr, verticalAlign]}>
          <div
            css={[
              wnr,
              contentAlign,
              css`
                top: 2rem;
              `,
            ]}
          >
            <span>닉네임</span>
            <span css={validButton}>중복 검사</span>
          </div>
          <input
            css={[
              wnr,
              inputStyle,
              css`
                top: 3.3125rem;
              `,
            ]}
            type="text"
            placeholder="닉네임을 입력해주세요."
          />
          <div
            css={[
              wnr,
              contentAlign,
              css`
                top: 6.4375rem;
              `,
            ]}
          >
            <span>이메일</span>
            <span css={validButton}>중복 검사</span>
          </div>
          <input
            css={[
              wnr,
              inputStyle,
              css`
                top: 7.75rem;
              `,
            ]}
            type="text"
            placeholder="이메일을 입력해주세요."
          />
          <div
            css={[
              wnr,
              contentAlign,
              css`
                top: 11rem;
              `,
            ]}
          >
            비밀번호
          </div>
          <input
            css={[
              wnr,
              inputStyle,
              css`
                top: 12.3125rem;
              `,
            ]}
            type="text"
            placeholder="비밀번호를 입력해주세요."
          />
          <input
            css={[
              wnr,
              inputStyle,
              css`
                top: 15.1875rem;
              `,
            ]}
            type="text"
            placeholder="비밀번호를 한 번 더 입력해주세요."
          />
          <div
            css={[
              wnr,
              contentAlign,
              css`
                top: 18.4375rem;
              `,
            ]}
          >
            <span>이용약관</span>
            <button css={[wnr, buttonStyle, see]}>보기</button>
          </div>
          <div
            css={[
              wnr,
              contentAlign,
              css`
                top: 20.1875rem;
              `,
            ]}
          >
            <span>이용약관</span>
            <button css={[wnr, buttonStyle, see]}>보기</button>
          </div>
          <div css={[wnr, checkStyle]}>
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
          <button
            css={[
              wnr,
              buttonStyle,
              css`
                position: absolute;
                top: 23.75rem;
              `,
            ]}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
