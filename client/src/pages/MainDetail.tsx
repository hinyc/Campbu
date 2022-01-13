/** @jsxImportSource @emotion/react */
import {
  color,
  flexBetween,
  flexVertical,
  host,
  relative,
  rem,
  reviews,
} from '../common';
import LikeSymbol from '../components/LikeSymbol';
import ReviewBox from '../components/ReviewBox';
import ReviewTitle from '../components/ReviweTitle';
import { css, useTheme } from '@emotion/react';
import Gage from '../components/Gage';
import BackButton from '../components/BackButton';
import { Button } from '../components/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import Calendar from '../components/CalendarForLender';

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

interface propsType {
  postId?: number;
}

function DetailView({ postId }: propsType) {
  const navigate = useNavigate();
  const [deposit, setDeposit] = useState(0);
  const [rentalFee, setRentalFee] = useState(0);
  const [unableDates, setunableDates] = useState<string[]>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imgUrls, setImgUrls] = useState<any>();
  const [rentalDates, setRentalDates] = useState<string[]>();
  const [getReviews, setGetReviews] = useState<
    { id: number; review: string; count?: number }[]
  >([]);

  useEffect(() => {
    const API = `${host}/product/post/${postId}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // axios.get(API, config);

    //요청 결과 예시 데이터
    let dummydata = {
      posts: [
        {
          id: 1,
          category: 'Tent',
          deposit: 30000,
          rental_fee: 20000,
          unavailable_dates: ['2021-12-20', '2021-12-21', '2021-12-22'],
          title: '3~4인용 텐트 빌려드려요',
          content: '쉽게 설치할 수 있는 3~4인용 텐트입니다.',
          longitude: 126.99597295767953,
          latitude: 35.97664845766847,
          address: '서울특별시 동작구 신대방동',
          img_urls: 'https://asdf.s3.ap-northeast-2.amazonaws.com/...',
          users_id: 1,
          created_at: '2021-12-16T09:42:40.000Z',
          updated_at: '2021-12-16T09:42:40.000Z',
          likes_count: 5,
        },
      ],
      reviews: [
        {
          id: 1,
          users_id: 1,
          reviews_id: 2,
          count: 5,
          created_at: '2021-12-16T09:42:40.000Z',
          updated_at: '2021-12-16T09:42:40.000Z',
        },
        {
          id: 1,
          users_id: 1,
          reviews_id: 8,
          count: 5,
          created_at: '2021-12-16T09:42:40.000Z',
          updated_at: '2021-12-16T09:42:40.000Z',
        },
        {
          id: 1,
          users_id: 1,
          reviews_id: 4,
          count: 5,
          created_at: '2021-12-16T09:42:40.000Z',
          updated_at: '2021-12-16T09:42:40.000Z',
        },
        {
          id: 1,
          users_id: 1,
          reviews_id: 11,
          count: 5,
          created_at: '2021-12-16T09:42:40.000Z',
          updated_at: '2021-12-16T09:42:40.000Z',
        },
      ],
    };
    let tempReviews: {
      id: number;
      review: string;
      count?: number;
    }[] = [...reviews];

    dummydata.reviews.forEach((el) => {
      tempReviews[el.reviews_id - 1] = {
        ...tempReviews[el.reviews_id - 1],
        count: el.count,
      };
    });

    console.log(1);
    setGetReviews(tempReviews);
    setDeposit(dummydata.posts[0].deposit);
    setRentalFee(dummydata.posts[0].rental_fee);
    setunableDates(dummydata.posts[0].unavailable_dates);
    setTitle(dummydata.posts[0].title);
    setContent(dummydata.posts[0].content);
    setImgUrls(dummydata.posts[0].img_urls);
  }, []);

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
          <div
            onClick={() => {
              navigate('/main');
            }}
          >
            <BackButton />
          </div>
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
          <div>{title}</div>
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
            <p>{content}</p>
          </div>
          <ReviewTitle text={'대여자에게 받은 좋은 리뷰'} width={371} />
          <div css={reviewAlign}>
            {getReviews.map((review, idx) => {
              return review.id < 7 ? (
                <ReviewBox
                  key={idx}
                  content={reviews[review.id - 1].review}
                  count={review.count}
                  isBad={false}
                  width={180}
                  height={37}
                  margin={`${rem(4)} 0`}
                />
              ) : null;
            })}
          </div>
          <ReviewTitle text={'대여자에게 받은 나쁜 리뷰'} width={371} />
          <div css={reviewAlign}>
            {getReviews.map((review, idx) => {
              return review.id < 7 ? null : (
                <ReviewBox
                  key={idx}
                  content={reviews[review.id - 1].review}
                  count={review.count}
                  isBad={true}
                  width={180}
                  height={37}
                  margin={`${rem(4)} 0`}
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
                  relative,
                  css`
                    border-right: 1px solid ${color.border};
                  `,
                ]}
              >
                <div css={fontSize9}>대여일</div>

                <Calendar />

                <div>날짜</div>
              </div>
              <div css={[flexVertical, selectDate]}>
                <div css={fontSize9}>반납일</div>
                <div>날짜</div>
              </div>
            </div>
            <div css={[flexBetween, moneyContent]}>
              <span>보증금 </span>
              <span>{`${deposit} 원`}</span>
            </div>
            <div css={[flexBetween, moneyContent]}>
              <span>대여비 </span>

              {rentalDates ? (
                <>
                  <span>{`${rentalFee} × ${rentalDates.length}일`}</span>
                  <span>{` ${rentalFee * rentalDates.length} 원`}</span>
                </>
              ) : (
                `${rentalFee} 원`
              )}
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
              <span>{` ${
                rentalFee * (rentalDates ? rentalDates.length : 1) + deposit
              } 원`}</span>
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
