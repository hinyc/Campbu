/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const backgroundStyle = css`
  margin: 50px;
  background-color: white;
  width: 20.875rem;
  height: 28.125rem;
  border-radius: 0.9375rem;
  box-shadow: 0rem 0.1rem 0.3rem 0.03rem #4c4c4c;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;
  position: relative;
`;
const wnr = css`
  width: 12.8125rem;
  border-radius: 0.9375rem;
`;
const verticalAlign = css`
  display: flex;
  flex-direction: column;
`;

const inputStyle = css`
  height: 2.375rem;
  border: 1px solid #dedede;
  position: absolute;
  padding-left: 0.75rem;
  font-size: 0.75rem;
  ::placeholder {
    color: #c4c4c4;
  }
`;

const contentAlign = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
`;
const checkStyle = css`
  top: 22.0625rem;
  position: absolute;
  display: flex;
  justify-content: center;
`;
const buttonStyle = css`
  border: none;
  height: 2.5rem;
  position: absolute;
  color: #ffffff;
  background-color: #ed662c;
  font-size: 0.75rem;
`;

const see = css`
  color: #ffffff;
  font-size: 0.625rem;
  width: 2.5625rem;
  height: 1.3125rem;
  line-height: 1.3125rem;
  background-color: #ed662c;
  border-radius: 0.9375rem;
`;

const validButton = css`
  color: #adadad;
  :hover {
    color: #ed662c;
    font-weight: bold;
  }
`;
const x = css`
  font-size: 0.875rem;
  color: #c4c4c4;
  top: 0.875rem;
  left: 18.6875rem;
  position: absolute;
`;

function Singup() {
  return (
    <div className="Singup" css={backgroundStyle}>
      <div css={x}>&times;</div>
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
          <span css={see}>보기</span>
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
          <span css={see}>보기</span>
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
              top: 23.75rem;
            `,
          ]}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}

export default Singup;
