/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { color, rem, hover, relative, absolute } from '../common';

const profileImg: string = `https://images.unsplash.com/photo-1497906539264-eb74442e37a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80`;

const imgStyle = css`
  width: ${rem(137)};
  height: ${rem(137)};
  margin: 0 ${rem(58)};
  border-radius: 50%;
  background-size: cover;
  background-image: ${`url(${profileImg})`};
`;

const gageStyle = css`
  border: 1px solid ${color.border};
  border-radius: ${rem(10)};
  height: ${rem(12)};
`;
const gageFillStyle = css`
  border: none;

  background-color: ${color.point};
  width: ${rem(208)};
`;

const reviewDiv = css`
  font-size: 1rem;
  font-weight: 700;
  width: ${rem(290)};
  border-bottom: 1px solid ${color.valid};
  margin: 1.2rem 0;
`;

const reviewStyle = css`
  font-size: ${rem(14)};
  text-align: center;
  background-color: ${color.white};
  width: ${rem(204)};
  height: ${rem(46)};
  line-height: ${rem(46)};
  border: 1px solid black;
  border-radius: ${rem(49)};
  margin: ${rem(15)} 0 0 ${rem(30)};
`;

const wnr = css`
  width: ${rem(205)};
  border-radius: ${rem(10)};
`;
const verticalAlign = css`
  width: ${rem(535)};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const inputStyle = css`
  height: ${rem(42)};
  border: 1px solid black;
  padding-left: ${rem(12)};
  font-size: ${rem(12)};
  ::placeholder {
    color: ${color.placeholder};
  }
`;

const contentAlign = css`
  display: flex;
  font-size: ${rem(14)};
  justify-content: space-between;
  align-items: center;
  margin-top: ${rem(10)};
`;

const buttonStyle = css`
  border: none;
  height: ${rem(40)};
  color: ${color.white};
  background-color: ${color.point};
  font-size: ${rem(12)};
  margin-top: ${rem(20)};
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
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
        `}
      >
        <div css={imgStyle}></div>
        <div>
          <div
            css={css`
              display: flex;
            `}
          >
            <div
              css={[
                // confirm,
                relative,
                css`
                  width: ${rem(250)};
                `,
              ]}
            >
              <div
                css={[
                  absolute,
                  css`
                    right: 10px;
                    bottom: 15px;
                  `,
                ]}
              >
                83%
              </div>
              <div
                css={[
                  gageStyle,
                  absolute,
                  css`
                    bottom: 0;
                    width: ${rem(250)};
                  `,
                ]}
              ></div>
              <div
                css={[
                  gageStyle,
                  gageFillStyle,
                  absolute,
                  css`
                    bottom: 0;
                  `,
                ]}
              ></div>
            </div>
            <div
              css={css`
                border: 2px solid ${color.point};
                border-radius: 50%;
                width: ${rem(50)};
                height: ${rem(50)};
                margin: 0 ${rem(34)} 0 ${rem(16)};
              `}
            ></div>
          </div>
          <div
            css={css`
              text-align: right;
              font-weight: 700;
              margin: ${rem(7)} ${rem(50)} 0 0;
            `}
          >
            깐부지수
          </div>
        </div>
      </div>
      <div
        css={[
          css`
            border-top: 2px solid ${color.valid};
            margin-top: ${rem(20)};
            display: flex;
          `,
        ]}
      >
        <div
          css={[
            // confirm,
            css`
              width: ${rem(326)};
              height: ${rem(500)};
              border-right: 2px solid ${color.valid};
            `,
          ]}
        >
          <div css={[reviewDiv]}>좋은리뷰</div>
          {reviews.map((review) => {
            return review.id < 7 ? (
              <div key={review.id} css={reviewStyle}>
                {review.review}
              </div>
            ) : null;
          })}
          <div css={[reviewDiv]}>나쁜리뷰</div>
          {reviews.map((review) => {
            return review.id >= 7 ? (
              <div key={review.id} css={reviewStyle}>
                {review.review}
              </div>
            ) : null;
          })}
        </div>
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
          `}
        >
          <div css={[verticalAlign]}>
            <div css={[wnr, contentAlign]}>
              <span>닉네임</span>
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
            <div css={[wnr, contentAlign]}>비밀번호 확인</div>
            <input
              css={[wnr, inputStyle]}
              type="text"
              placeholder="비밀번호를 한 번 더 입력해주세요."
            />
            <button css={[wnr, buttonStyle]}>회원가입</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Mypage;
