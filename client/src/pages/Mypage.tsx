/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Gage from '../components/Gage';
import { color, rem, hover } from '../common';

const profileImg: string = `https://images.unsplash.com/photo-1497906539264-eb74442e37a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80`;

const imgStyle = css`
  width: ${rem(114)};
  height: ${rem(114)};
  border: 4px solid ${color.point};
  border-radius: 50%;
  background-size: cover;
  background-image: ${`url(${profileImg})`};
`;

const hello = css`
  text-align: center;
  font-size: ${rem(20)};
  font-weight: 700;
  margin-top: ${rem(24)};
  margin-bottom: ${rem(30)};
`;
const reviewDiv = css`
  font-size: 1rem;
  font-weight: 700;
  width: ${rem(265)};
  border-bottom: 1px solid ${color.valid};
  margin: 1.2rem 0;
`;

const reviewStyle = css`
  font-size: ${rem(14)};
  text-align: center;
  background-color: ${color.white};
  height: ${rem(43)};
  line-height: ${rem(46)};
  color: ${color.mid};
  border: 1px solid ${color.mid};
  margin: ${rem(10)} 0;
  display: flex;
  justify-content: space-between;
`;

const wnr = css`
  width: ${rem(265)};
  border-radius: ${rem(5)};
`;
const verticalAlign = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const inputStyle = css`
  height: ${rem(44)};
  border: 1px solid ${color.border};
  padding-left: ${rem(14)};
  font-size: ${rem(14)};
  margin-top: ${rem(11)};
  ::placeholder {
    color: ${color.placeholder};
  }
`;

const contentAlign = css`
  display: flex;
  font-size: ${rem(14)};
  justify-content: space-between;
  align-items: center;
  margin-top: ${rem(31)};
`;

const buttonStyle = css`
  border: none;
  height: ${rem(40)};
  color: ${color.white};
  background-color: ${color.point};
  font-size: ${rem(14)};
  margin-top: ${rem(33)};
  :hover {
    box-shadow: ${hover};
  }
`;

function Mypage() {
  const reviews: { id: number; review: string; count: number }[] = [
    { id: 1, review: '가격이 합리적이에요', count: 7 },
    { id: 2, review: '물건을 깨끗하게 사용했어요', count: 7 },
    { id: 3, review: '물건 질이 좋아요', count: 7 },
    { id: 4, review: '답장이 빨라요', count: 7 },
    { id: 7, review: '물건이 파손되어 있어요', count: 7 },
    { id: 8, review: '답장이 느려요', count: 7 },
  ];

  return (
    <div
      css={css`
        width: ${rem(861)};
        margin: 0 auto;
        margin-top: ${rem(20)};
        display: flex;
      `}
    >
      <div
        css={[
          css`
            width: ${rem(430)};
            display: flex;
            flex-direction: column;
            align-items: center;
          `,
        ]}
      >
        <div css={imgStyle}></div>
        <div css={hello}>{`안녕하세요, ${`깐부`} 님`}</div>
        <Gage ratio={0.83} />
        <div
          css={[
            wnr,
            css`
              margin-top: ${rem(10)};
              margin-bottom: ${rem(20)};
              font-weight: 700;
            `,
          ]}
        >
          깐부지수 83%
        </div>
        <div css={[reviewDiv]}>대여자에게 받은 좋은 리뷰</div>
        {reviews.map((review) => {
          return review.id < 7 ? (
            <div key={review.id} css={[wnr, reviewStyle]}>
              <div
                css={css`
                  margin-left: ${rem(20)};
                `}
              >
                {review.review}
              </div>
              <div
                css={css`
                  margin-right: ${rem(20)};
                `}
              >{`+${review.count}`}</div>
            </div>
          ) : null;
        })}
        <div css={[reviewDiv]}>대여자에게 받은 나쁜 리뷰</div>
        {reviews.map((review) => {
          return review.id >= 7 ? (
            <div
              key={review.id}
              css={[
                wnr,
                reviewStyle,
                css`
                  color: ${color.deep};
                  border-color: ${color.deep};
                `,
              ]}
            >
              <div
                css={css`
                  margin-left: ${rem(20)};
                `}
              >
                {review.review}
              </div>
              <div
                css={css`
                  margin-right: ${rem(20)};
                `}
              >{`+${review.count}`}</div>
            </div>
          ) : null;
        })}
      </div>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          width: ${rem(430)};
        `}
      >
        <div css={[verticalAlign]}>
          <div css={hello}>회원정보 수정</div>
          <div css={[wnr, contentAlign]}>
            <span>프로필 사진</span>
            <span
              css={css`
                color: ${color.valid};
              `}
            >
              업로드
            </span>
          </div>
          <input
            css={[wnr, inputStyle]}
            type="text"
            placeholder="닉네임을 입력해주세요."
          />
          <div css={[wnr, contentAlign]}>
            <span>닉네임</span>
            <span
              css={css`
                color: ${color.valid};
              `}
            >
              중복 검사
            </span>
          </div>
          <input
            css={[wnr, inputStyle]}
            type="text"
            placeholder="닉네임을 입력해주세요."
          />
          <div css={[wnr, contentAlign]}>
            <span>이메일</span>
          </div>
          <input
            css={[wnr, inputStyle]}
            type="text"
            placeholder="이메일을 입력해주세요."
          />
          <div css={[wnr, contentAlign]}>비밀번호</div>
          <input
            css={[wnr, inputStyle]}
            type="text"
            placeholder="비밀번호를 입력해주세요."
          />
          <input
            css={[wnr, inputStyle]}
            type="text"
            placeholder="비밀번호를 한 번 더 입력해주세요."
          />
          <button css={[wnr, buttonStyle]}>수정완료</button>
          <div
            css={css`
              color: ${color.border};
              margin-top: ${rem(30)};
              text-decoration: underline;
            `}
          >
            회원탈퇴
          </div>
        </div>
      </div>
    </div>
  );
}
export default Mypage;
