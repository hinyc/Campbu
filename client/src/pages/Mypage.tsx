/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Gage from '../components/Gage';
import {
  color,
  rem,
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
import { isLogin } from '../Atom';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

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
  transition: 0.1s;
  :hover {
    opacity: 0.8;
    cursor: pointer;
  }
  :active {
    opacity: 0.95;
  }
`;

const noticeOk = css`
  font-size: ${rem(10)};
  color: ${color.mid};
`;
export const noticeNo = css`
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

export const reqMsgStyle = css`
  height: 1rem;
  margin-top: ${rem(14)};
  margin-bottom: ${rem(3)};
`;

const API = `${host}/userinfo/account`;
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

function Mypage() {
  //전역상태
  const setIsLogin = useSetRecoilState(isLogin);

  //지역상태
  const [currentNickName, setCurrentNickName] = useState('');
  const [nickname, setNickname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [userImg, setUserImg] = useState<string>('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [getReviews, setGetReviews] = useState<reviewsType>([]);
  const [passwordValid, setPasswordValid] = useState(false);
  const [nickDuplicateClick, setNickDuplicateClick] = useState(false);
  const [nickDupliacte, setNickDupliacte] = useState(false);
  const [reqState, setReqStatee] = useState<string>('ok');
  const navigate = useNavigate();
  // 유저정보요청
  useEffect(() => {
    const API = `${host}/userinfo/account`;

    axios.get(API, config).then((res) => {
      const userinfo = res.data;

      setUserImg(userinfo.users.users_img);
      setCurrentNickName(userinfo.users.nickname);
      setEmail(userinfo.users.email);
      //받은 review 목록
      let tempReviews: reviewsType = [...reviews];

      userinfo.reviews.forEach((el: any) => {
        tempReviews[el.reviews_id - 1] = {
          ...tempReviews[el.reviews_id - 1],
          count: el.count,
        };
      });
      setGetReviews(tempReviews);
    });
  }, []);

  interface reqMsgType {
    [key: string]: string;
  }
  const reqMag: reqMsgType = {
    ok: '',
    nickname: '* 닉네임을 확인해주세요',
    password: '* 비밀번호를 확인해주세요',
  };

  const nicknameHandler = (e: any) => {
    setNickname(e.target.value);
    setNickDuplicateClick(false);
    setNickDupliacte(false);
  };
  const nicknameDuplicateCheckHandler = () => {
    if (nickname.length > 0) {
      setNickDuplicateClick(true);

      axios
        .get(`${host}/user/signup?nickname=${nickname}`)
        .then((res) => {
          if (res.status === 200) {
            console.log(`API ${host}/user/signup?nickname=${nickname}`);
            console.log('닉네임 사용가능', setNickDupliacte(true));
            setReqStatee('ok');
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

  const campbuIndicator = calCampbuIndicator(getReviews);

  //! 수정 탈퇴 요청 함수
  const modifyAccount = () => {
    if (!!nickname && !nickDupliacte) {
      return setReqStatee('nickname');
    }

    if (passwordValid && password === confirmPassword) {
      const data: {
        nickname: string;
        password: string;
        users_img: string;
      } = {
        nickname: !nickname ? currentNickName : nickname,
        password: password,
        users_img: userImg,
      };
      console.log(data);
      axios.patch(API, data, config).then((res: any) => {
        console.log('응답', res.data.users.nickname);
        setCurrentNickName(res.data.users.nickname);
        setUserImg(res.data.users.users_img);
      });
    } else {
      return setReqStatee('password');
    }
  };

  const deleteAccount = () => {
    console.log('삭제요청 axios.delete', API);

    setIsLogin(false);
    axios
      .get(`${host}/user/logout`)
      .then((res: any) => {
        console.log(res.status);

        axios
          .delete(API, config)
          .then((res) => {
            if (res.status === 200) {
              console.log('탈퇴완료');
            }
          })
          .catch((err) => {
            console.log('잘못된요청');
          });
        navigate('/');
      })
      .catch((err) => console.error(err));
  };

  const insertImgHandler = async (e: any) => {
    const file = e.target.files[0];

    const geturlAPI = `${host}/newurl`;
    const { url } = await fetch(geturlAPI).then((res) => res.json());

    await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: file,
    });

    const imageUrl = url.split('?')[0];
    setUserImg(imageUrl);
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
        <div css={hello}>{`안녕하세요, ${currentNickName} 님`}</div>
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
            placeholder={currentNickName}
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
          <div css={[reqMsgStyle, noticeNo]}>{reqMag[reqState]}</div>
          <button css={[wnr, buttonStyle]} onClick={modifyAccount}>
            수정완료
          </button>
          <div
            css={css`
              color: ${color.border};
              margin-top: ${rem(30)};
              text-decoration: underline;
              transition: 0.1s;
              :hover {
                font-weight: 700;
                cursor: pointer;
              }
              :active {
                opacity: 0.75;
              }
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
