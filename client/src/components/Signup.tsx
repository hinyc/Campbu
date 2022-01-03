/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const backgroundStyle = css`
  background-color: lightgray;
  box-sizing: border-box;
  width: 20.875rem;
  height: 28.125rem;
  border-radius: 0.9375rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;
`;
const verticalAlign = css`
  display: flex;
  width: 12.8125rem;
  flex-direction: column;
`;

const contentStyle = css`
  font-size: 0.75rem;
`;

function Singup() {
  return (
    <div className="Singup" css={backgroundStyle}>
      <div css={verticalAlign}>
        <div>
          <span>닉네임</span>
          <span>중복 검사</span>
        </div>
        <input type="text" />
        <div>
          <span>이메일</span>
          <span>중복 검사</span>
        </div>
        <input type="text" />
        <div>비밀번호</div>
        <input type="text" />
        <input type="text" />
        <div>
          <span>이용약관</span>
          <span>보기</span>
        </div>
        <div>
          <span>이용약관</span>
          <span>보기</span>
        </div>
        <div>
          <input type="checkbox" />
          <span>모든 이용약관에 동의합니다.</span>
        </div>
        <button>회원가입</button>
      </div>
    </div>
  );
}

export default Singup;
