/** @jsxImportSource @emotion/react */
import { color, flexBetween, flexVertical, rem } from '../common';
import LikeSymbol from '../components/LikeSymbol';
import ReviewBox from '../components/ReviewBox';
import ReviewTitle from '../components/ReviweTitle';
import { css } from '@emotion/react';
import Gage from '../components/Gage';
import BackButton from '../components/BackButton';
import { Button } from '../components/Button';
const width = css`
  width: ${rem(752)};
`;
const moneyContent = css`
  width: ${rem(230)};
  margin-top: ${rem(16)};
`;
const productImg = css`
  width: ${rem(752)};
  height: ${rem(366)};
  background-size: cover;
`;

const reviewAlign = css`
  width: 23.1875rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const feeView = css`
  border: 1px solid ${color.border};
  border-radius: ${rem(10)};
  width: ${rem(280)};
  font-size: ${rem(11)};
  margin-top: ${rem(50)};
`;

const selectDate = css`
  width: ${rem(115)};
  height: ${rem(44)};
  justify-content: space-between;
  align-items: flex-start;
  padding: ${rem(7)};
`;

const fontSize9 = css`
  font-size: ${rem(9)};
  font-weight: 700;
`;
const fontSize40 = css`
  font-size: ${rem(40)};
  margin: 0 ${rem(20)};
  color: ${color.border};
`;

const reviews: { id: number; review: string; count: number }[] = [
  { id: 1, review: '합리적인 가격', count: 7 },
  { id: 2, review: '정확한 시간 약속', count: 7 },
  { id: 3, review: '물건의 좋은 질', count: 7 },
  { id: 4, review: '빠른 답장', count: 7 },
  { id: 7, review: '잦은 약속 변경', count: 7 },
  { id: 8, review: '느린 답장', count: 7 },
];

function DetailView() {
  const productImgUrl: string =
    'https://paperbarkcamp.com.au/wp-content/uploads/2019/07/paperbark_flash-camp_news_1218x650.jpg';

  return (
    <div css={flexVertical}>
      <div css={flexVertical}>
        <div
          css={css`
            width: ${rem(830)};
            text-align: left;
            margin-bottom: ${rem(32)};
          `}
        >
          <BackButton />
        </div>
        <div
          css={[
            flexBetween,
            css`
              width: ${rem(752)};
              align-items: center;
              align-content: center;
            `,
          ]}
        >
          <div>3~4인용 텐트 빌려드려요</div>
          <LikeSymbol
            isFill={false}
            count={14}
            fontSize={18}
            borderColor={color.border}
          />
        </div>
        <div
          css={[
            flexBetween,
            css`
              margin-top: ${rem(20)};
              align-items: center;
            `,
          ]}
        >
          <div css={fontSize40}>{`<`}</div>
          <div
            css={[
              productImg,
              css`
                background-image: ${`url(${productImgUrl})`};
              `,
            ]}
          ></div>
          <div css={fontSize40}>{`>`}</div>
        </div>
      </div>
      <div css={[flexBetween, width]}>
        <div>
          <ReviewTitle text={'상세설명'} width={371} />
          <div
            css={[
              css`
                width: 23.1875rem;
                height: 6.25rem;
              `,
            ]}
          >
            <div>산지는 2년 됐지만 사용한 적은 3번 정도 입니다.</div>
            <div>깨끗하게 사용했습니다.</div>
          </div>
          <ReviewTitle text={'대여자에게 받은 좋은 리뷰'} width={371} />
          <div css={reviewAlign}>
            {reviews.map((review, idx) => {
              return review.id < 7 ? (
                <ReviewBox
                  key={idx}
                  content={review.review}
                  count={review.count}
                  isBad={false}
                  width={180}
                />
              ) : null;
            })}
          </div>
          <ReviewTitle text={'대여자에게 받은 나쁜 리뷰'} width={371} />
          <div css={reviewAlign}>
            {reviews.map((review, idx) => {
              return review.id < 7 ? null : (
                <ReviewBox
                  key={idx}
                  content={review.review}
                  count={review.count}
                  isBad={true}
                  width={180}
                />
              );
            })}
          </div>
        </div>
        <div
          css={[
            css`
              margin-top: ${rem(30)};
            `,
          ]}
        >
          <div>
            <div
              css={[
                flexBetween,
                css`
                  align-items: flex-end;
                  justify-content: flex-end;
                  margin-bottom: ${rem(10)};
                `,
              ]}
            >
              <div>
                <div
                  css={css`
                    text-align: right;
                    font-weight: 700;
                  `}
                >
                  93%
                </div>
                <Gage ratio={0.93} width={153} />
              </div>
              <div
                css={css`
                  width: ${rem(48)};
                  height: ${rem(48)};
                  border-radius: 50%;
                  border: 2px solid ${color.point};
                  margin-left: ${rem(10)};
                `}
              ></div>
            </div>
            <div
              css={css`
                text-align: right;
                font-weight: 700;
              `}
            >
              깐부지수
            </div>
          </div>

          <div css={[flexVertical, feeView]}>
            <div
              css={[
                moneyContent,
                css`
                  font-size: ${rem(16)};
                `,
              ]}
            >
              날짜를 입력하고 대여 비용을 확인해보세요
            </div>
            <div
              css={[
                css`
                  display: flex;
                  margin-top: ${rem(15)};
                  border: 1px solid ${color.border};
                  border-radius: ${rem(5)};
                `,
              ]}
            >
              <div
                css={[
                  flexVertical,
                  selectDate,
                  css`
                    border-right: 1px solid ${color.border};
                  `,
                ]}
              >
                <div css={fontSize9}>대여일</div>
                <div>날짜</div>
              </div>
              <div css={[flexVertical, selectDate]}>
                <div css={fontSize9}>반납일</div>
                <div>날짜</div>
              </div>
            </div>
            <div css={[flexBetween, moneyContent]}>
              <span>보증금 </span>
              <span>금액</span>
            </div>
            <div css={[flexBetween, moneyContent]}>
              <span>대여비 </span>
              <span>금액</span>
            </div>
            <div
              css={[
                flexBetween,
                moneyContent,
                css`
                  border-top: 1px solid black;
                  padding: ${rem(15)} 0;
                  font-weight: 700;
                `,
              ]}
            >
              <span>총 합계 </span>
              <span>금액</span>
            </div>
            <Button
              text="요금확인"
              width={rem(221)}
              height={rem(36)}
              background={color.point}
              color={color.white}
              border="none"
              size={rem(14)}
              margin={`${rem(10)} 0`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailView;
