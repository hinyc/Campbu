/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Gage from '../components/Gage';
import {
  color,
  rem,
  hover,
  host,
  reviews,
  hidden,
  relative,
  colorPlaceholder,
  inactive,
  reviewsType,
  calCampbuIndicator,
} from '../common';
import ReviewBox from '../components/ReviewBox';
import ReviewTitle from '../components/ReviweTitle';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { imgFile } from '../Atom';
import { useRecoilState } from 'recoil';

const imgStyle = css`
  width: ${rem(114)};
  height: ${rem(114)};
  border: 4px solid ${color.point};
  border-radius: 50%;
  background-size: cover;
`;

const hello = css`
  text-align: center;
  font-size: ${rem(20)};
  font-weight: 700;
  margin-top: ${rem(24)};
  margin-bottom: ${rem(30)};
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

const noticeOk = css`
  font-size: ${rem(10)};
  color: ${color.mid};
`;
const noticeNo = css`
  font-size: ${rem(10)};
  color: ${color.point};
`;

const validButtonInactive = css`
  color: ${color.border};
  font-weight: 700;
`;
const validButtonActive = css`
  color: ${color.point};
  font-weight: 700;
  :hover {
    color: ${color.point};
    cursor: pointer;
    opacity: 0.8;
  }
  :active {
    opacity: 0.95;
  }
`;

const reviewsAlign = css`
  width: ${rem(371)};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const hiddenUpload = css`
  position: absolute;
  line-height: ${rem(107)};
  color: white;
  top: -4px;
  left: -4px;
  background-color: black;
  opacity: 0;
  text-align: center;
  transition: 0.2s;
  :hover {
    opacity: 0.4;
    cursor: pointer;
  }
  :active {
    opacity: 0.1;
  }
`;

function Mypage() {
  const [nickname, setNickname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [userImg, setUserImg] = useState<string>('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [imgfiles, setFiles] = useRecoilState(imgFile);
  const [getReviews, setGetReviews] = useState<reviewsType>([
    {
      id: 0,
      review: '',
      count: 0,
    },
  ]);

  const [passwordValid, setPasswordValid] = useState(false);
  const [nickDuplicateClick, setNickDuplicateClick] = useState(false);
  const [nickDupliacte, setNickDupliacte] = useState(false);

  // 유저정보요청
  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // axios
    //   .get(`${host}/userinfo/account`, config)
    //   .then((res) => console.log(res));

    // 서버로부터 받은 데이터 예시
    const userinfo = {
      users: {
        id: 1,
        email: 'code@gmail.com',
        nickname: '김코딩',
        users_img:
          'https://images.unsplash.com/photo-1497906539264-eb74442e37a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
        created_at: '2021-12-16T09:42:40.000Z',
        updated_at: '2021-12-16T09:42:40.000Z',
        reviews: [
          {
            id: 1,
            users_id: 1,
            reviews_id: 1,
            count: 2,
            created_at: '2021-12-16T09:42:40.000Z',
            updated_at: '2021-12-16T09:42:40.000Z',
          },
          {
            id: 1,
            users_id: 1,
            reviews_id: 12,
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
            reviews_id: 7,
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
            reviews_id: 10,
            count: 5,
            created_at: '2021-12-16T09:42:40.000Z',
            updated_at: '2021-12-16T09:42:40.000Z',
          },
          {
            id: 1,
            users_id: 1,
            reviews_id: 6,
            count: 5,
            created_at: '2021-12-16T09:42:40.000Z',
            updated_at: '2021-12-16T09:42:40.000Z',
          },
        ],
      },
    };
    setUserImg(userinfo.users.users_img);
    setNickname(userinfo.users.nickname);
    setEmail(userinfo.users.email);

    //받은 review 목록
    let tempReviews: reviewsType = [...reviews];

    userinfo.users.reviews.forEach((el) => {
      tempReviews[el.reviews_id - 1] = {
        ...tempReviews[el.reviews_id - 1],
        count: el.count,
      };
    });

    setGetReviews(tempReviews);
  }, []);

  const nicknameHandler = (e: any) => setNickname(e.target.value);
  const nicknameDuplicateCheckHandler = () => {
    if (nickname.length > 0) {
      setNickDuplicateClick(true);

      axios
        .get(`${host}/user/signup?nickname=${nickname}`)
        .then((res) => {
          if (res.status === 200) {
            console.log(`API ${host}/user/signup?nickname=${nickname}`);
            console.log('닉네임 사용가능', setNickDupliacte(true));
          }
        })
        .catch((err) => {
          setNickDupliacte(false);
          console.log('닉네임 중복', setNickDupliacte(false));
        });
    }
  };

  const emailHandler = (e: any) => setEmail(e.target.value);
  const passwordHandler = (e: any) => {
    const password = e.target.value;
    setPassword(password);
    const passwordValidator = /(?=.*[0-9])(?=.*[A-Za-z]).{8,}/g;
    setPasswordValid(passwordValidator.test(password));
  };

  const confirmPasswordHandler = (e: any) => setConfirmPassword(e.target.value);

  const campbuIndicator = calCampbuIndicator(getReviews); // 계산 방법 필요
  console.log(campbuIndicator);
  //! 수정 탈퇴 요청 함수
  const API = `${host}/userinfo/account`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const modifyAccount = () => {
    if (passwordValid && password === confirmPassword) {
      console.log('수정요청 axios.patch', API);
      const modifyData: {
        nickname: string;
        password: string;
        user_img: string;
      } = {
        nickname: nickname,
        password: password,
        user_img: userImg,
      };
      console.log('data', modifyData);
    }
  };
  const deleteAccount = () => {
    console.log('삭제요청 axios.delete', API);

    // axios
    //   .delete(API, config)
    //   .then((res) => {
    //     if (res.status === 200) {
    //       console.log('탈퇴완료');
    //     }
    //   })
    //   .catch((err) => {
    //     console.log('잘못된요청');
    //   });
  };

  const insertImgHandler = (e: any) => {
    const target = e.target.files[0];

    let reader = new FileReader();

    if (target) {
      reader.readAsDataURL(target);
      setFiles([...imgfiles, target]);
    }

    reader.onloadend = () => {
      const preViewUrl = reader.result;
      if (preViewUrl) {
        setUserImg(String(preViewUrl));
      }
    };
  };

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
        <div
          css={[
            imgStyle,
            relative,
            css`
              background-image: ${`url(${userImg})`};
            `,
          ]}
        >
          <form encType="multiparty/form-data">
            <label css={[imgStyle, hiddenUpload]} htmlFor="file">
              수정하기
            </label>
            <input
              css={hidden}
              type="file"
              id="file"
              accept="image/*"
              onChange={insertImgHandler}
            />
          </form>
        </div>
        <div css={hello}>{`안녕하세요, ${nickname} 님`}</div>
        <Gage ratio={campbuIndicator} />
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
          {`깐부지수 ${campbuIndicator * 100}%`}
        </div>
        <ReviewTitle text="대여자에게 받은 좋은 리뷰" width={371} />
        <div css={reviewsAlign}>
          {getReviews.map((review, idx) => {
            return review.id < 7 ? (
              <ReviewBox
                key={idx}
                content={review.review}
                count={review.count}
                isBad={false}
                width={180}
                margin={`${rem(5)} 0`}
              />
            ) : null;
          })}
        </div>
        <ReviewTitle text="대여자에게 받은 나쁜 리뷰" width={371} />
        <div css={reviewsAlign}>
          {getReviews.map((review, idx) => {
            return review.id < 7 ? null : (
              <ReviewBox
                key={idx}
                content={review.review}
                count={review.count}
                isBad={true}
                width={180}
                margin={`${rem(5)} 0`}
              />
            );
          })}
        </div>
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
            <span>닉네임</span>
            <div
              css={css`
                width: ${rem(120)};
                margin-right: ${rem(8)};
              `}
            >
              {nickDuplicateClick ? (
                nickDupliacte ? (
                  <div css={noticeOk}> * 사용가능한 닉네임입니다.</div>
                ) : (
                  <div css={noticeNo}> * 중복된 닉네임입니다.</div>
                )
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
          <input
            css={[wnr, inputStyle]}
            type="text"
            placeholder="닉네임을 입력해주세요."
            onChange={nicknameHandler}
            value={nickname}
          />
          <div css={[wnr, contentAlign]}>
            <span>이메일</span>
          </div>
          <input
            css={[wnr, inputStyle, colorPlaceholder, inactive]}
            type="text"
            placeholder="이메일을 입력해주세요."
            onChange={emailHandler}
            value={email}
            readOnly
          />
          <div css={[wnr, contentAlign]}>
            <div>비밀번호</div>
            <div
              css={css`
                width: ${rem(180)};
                margin-right: ${rem(24)};
              `}
            >
              {confirmPassword.length > 0 && passwordValid ? (
                password === confirmPassword ? (
                  <div css={noticeOk}>* 사용가능한 비밀번호입니다.</div>
                ) : (
                  <div css={noticeNo}>* 비밀번호가 일치하지 않습니다.</div>
                )
              ) : password.length > 0 ? (
                passwordValid ? null : (
                  <div css={noticeNo}>
                    * 영문, 숫자 조합 8자 이상 입력해주세요.{' '}
                  </div>
                )
              ) : null}
            </div>
          </div>
          <input
            css={[wnr, inputStyle]}
            type="password"
            placeholder="비밀번호를 입력해주세요."
            onChange={passwordHandler}
            value={password}
          />
          <input
            css={[wnr, inputStyle]}
            type="password"
            placeholder="비밀번호를 한 번 더 입력해주세요."
            onChange={confirmPasswordHandler}
            value={confirmPassword}
          />
          <button css={[wnr, buttonStyle]} onClick={modifyAccount}>
            수정완료
          </button>
          <div
            css={css`
              color: ${color.border};
              margin-top: ${rem(30)};
              text-decoration: underline;
            `}
            onClick={deleteAccount}
          >
            회원탈퇴
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mypage;
