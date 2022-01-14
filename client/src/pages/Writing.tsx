/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Input from '../components/Input';
import {
  color,
  confirm,
  flexVertical,
  flexBetween,
  rem,
  addressAPI,
  relative,
  hidden,
} from '../common';
import { Button } from '../components/Button';
import BackButton from '../components/BackButton';
import Calendar from '../components/Calendar';
import { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  selectDate,
  searchAddress,
  selectAddress,
  showAddressList,
  preView,
  formData,
  imgFile,
} from '../Atom';
import axios from 'axios';
import SelectAddressList from '../components/SelectAddress';

const fixAddressList = css`
  position: absolute;
`;

const textareaStyle = css`
  width: 29.9375rem;
  height: 11.125rem;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid ${color.border};
  border-radius: 0.3125rem;
  resize: none;
  ::placeholder {
    font-size: 1rem;
    color: ${color.placeholder};
  }
`;

const selectStyle = css`
  width: ${rem(205)};
  height: ${rem(50)};
  color: ${color.placeholder};
  border: 1px solid ${color.border};
  border-radius: 0.3125rem;
  padding: 0 0.75rem;
  font-size: 1rem;
  margin-top: ${rem(32)};
`;
const marginTop = css`
  margin-top: 1rem;
`;

const onLoadImgStyle = css`
  border-radius: 0.35rem;
  margin-right: 0.625rem;
  text-align: center;
  background-color: ${color.border};
  width: 7rem;
  height: 7rem;
  transition: 0.1s;
  color: rgba(0, 0, 0, 0);
  :hover {
    color: ${color.placeholder};
  }
`;

const imgStyle = css`
  border: 1px solid ${color.placeholder};

  border-radius: 0.3125rem;
  margin-right: 0.625rem;
  text-align: center;
  object-fit: cover;
  width: 100%;
  height: 100%;
  transition: 0.1s;
  :hover {
    opacity: 0.4;
  }
`;
const inputFileStyle = css`
  border: 1px solid ${color.border};
  border-radius: 0.3125rem;

  text-align: center;
  width: 7rem;
  height: 7rem;
`;

const inputFileCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const labelStyle = css`
  color: ${color.placeholder};
  font-size: 5rem;
  width: 7rem;
  height: 7rem;
  line-height: 7.6rem;
  transition: 0.1s;
  :hover {
    opacity: 0.6;
  }
  :active {
    opacity: 0.95;
  }
`;
const xStyle = css`
  font-size: 2rem;
  position: absolute;
  top: 0.1rem;
  right: 0.5rem;
`;

const uploadImgStyle = css`
  width: ${rem(850)};
  display: flex;
  align-content: center;
  align-items: center;
`;

const UploadImg = () => {
  const [imgfiles, setFiles] = useRecoilState(imgFile);
  const [preViews, setPreViews] = useRecoilState(preView);
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
        setPreViews([...preViews, preViewUrl]);
      }
    };
  };

  const deleteImg = (target: number) => {
    setFiles(imgfiles.filter((el, idx) => idx !== target));
    setPreViews(preViews.filter((el, idx) => idx !== target));
  };

  return (
    <div css={[uploadImgStyle, confirm]}>
      {imgfiles.map((el, idx) => {
        return (
          <div key={idx} css={[onLoadImgStyle, relative]}>
            <img
              css={imgStyle}
              draggable="false"
              src={preViews[idx]}
              alt={el.name}
            />
            <div css={xStyle} onClick={() => deleteImg(idx)}>
              ×
            </div>
          </div>
        );
      })}
      <form
        css={[inputFileStyle, inputFileCenter]}
        encType="multiparty/form-data"
      >
        <label htmlFor="file" css={labelStyle}>
          +
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
  );
};

export const Writing = () => {
  const [setCategory, setSetCategory] = useState<string>('');
  const [deposit, setDeposit] = useState<string>('');
  const [rentalFee, setRentalFee] = useState<string>('');
  const unavailableDates = useRecoilValue(selectDate);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [address, setAddress] = useRecoilState(selectAddress);
  const setSerchAdress = useSetRecoilState(searchAddress);
  const [showAdress, setShowAdress] = useRecoilState(showAddressList);
  const [imgUrls, setImgUrls] = useState<string>('');
  const imgfiles = useRecoilValue(imgFile);
  const [formDatas, setFormDatas] = useRecoilState(formData);

  const category: string[] = [
    '카테고리를 입력하세요',
    '패키지',
    '텐트/침낭',
    '그릴/버너',
    '의자/테이블',
    '배낭/아이스박스',
    '취식용품',
    '기타',
  ];
  const titleHandler = (e: any) => setTitle(e.target.value);
  const depositHandler = (e: any) => setDeposit(e.target.value);
  const rentalFeeHandler = (e: any) => setRentalFee(e.target.value);
  const contentHandler = (e: any) => setContent(e.target.value);
  const setCategoryHandler = (e: any) => setSetCategory(e.target.value);
  const addressHandler = (e: any) => setAddress(e.target.value);

  const getAdress = () => {
    if (address.length > 0) {
      axios
        .get(
          `https://www.juso.go.kr/addrlink/addrLinkApi.do?currentPage=1&countPerPage=50&keyword=${address}&confmKey=${addressAPI}&resultType=json`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then((res) => {
          const address = res.data.results.juso;
          const adressList: string[] = [];
          if (address) {
            const allSerchAdress = address.map((el: any) => {
              return `${el.siNm} ${el.sggNm} ${el.emdNm}`;
            });

            allSerchAdress.forEach((el: string, idx: number) => {
              if (allSerchAdress.indexOf(el) === idx) {
                adressList.push(el);
              }
            });
          }

          setSerchAdress(adressList);
          setShowAdress(true);
        });
    }
  };

  const wrightHandler = () => {
    interface wrightType {
      category: string;
      deposit: number;
      rental_fee: number;
      unavailable_dates: string[];
      title: string;
      content: string;
      Address?: string;
      img_urls?: string;
    }
    const wrigthDate: wrightType = {
      category: setCategory,
      deposit: Number(deposit),
      rental_fee: Number(rentalFee),
      unavailable_dates: unavailableDates,
      title: title,
      content: content,
      Address: address,
      img_urls: imgUrls,
    };
    console.log(wrigthDate);

    /// 사진전송
    const fd = new FormData();
    console.log('!!', imgfiles);
    Object.values(imgfiles).forEach((file) => fd.append('file', file));

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },

      // axios.post(API, fd, config)
    };

    console.log('??', fd);
  };

  return (
    <div css={flexVertical}>
      <div
        css={css`
          width: ${rem(850)};
        `}
      >
        <BackButton />
      </div>
      <div>
        <div css={marginTop}>
          <Input
            width={850}
            height={55}
            borderStyle="none none solid none"
            borderRadius={0}
            placeholder="제목을 입력해주세요"
            onChange={titleHandler}
          />
        </div>
        <div css={flexBetween}>
          <div
            css={css`
              width: 29.9375rem;
            `}
          >
            <select
              css={selectStyle}
              onChange={setCategoryHandler}
              value={setCategory}
            >
              {category.map((el, idx) => (
                <option key={idx}>{el}</option>
              ))}
            </select>
            <div css={[marginTop, flexBetween]}>
              <Input
                width={372}
                height={50}
                borderRadius={5}
                placeholder="주소를 검색하세요"
                onChange={addressHandler}
                value={address}
              />
              <Button
                text="주소 검색"
                width={rem(97)}
                height={rem(50)}
                background={color.white}
                color={color.point}
                size={rem(16)}
                border={`1px solid ${color.point}`}
                onClick={getAdress}
              />
            </div>
            <div css={fixAddressList}>
              {showAdress ? <SelectAddressList /> : null}
            </div>
            <div
              css={[
                marginTop,
                flexBetween,
                css`
                  justify-content: flex-start;
                  align-items: center;
                `,
              ]}
            >
              <Input
                width={205}
                height={50}
                borderRadius={5}
                placeholder="보증금"
                onChange={rentalFeeHandler}
                type="number"
                value={String(rentalFee)}
              />
              <div
                css={css`
                  margin-left: ${rem(35)};
                `}
              >
                <Input width={19} height={19} type="checkbox" />
              </div>
              <span
                css={css`
                  margin-left: ${rem(17)};
                `}
              >
                대여자와 협의
              </span>
            </div>

            <div
              css={[
                marginTop,
                flexBetween,
                css`
                  justify-content: flex-start;
                  align-items: center;
                `,
              ]}
            >
              <Input
                width={205}
                height={50}
                borderRadius={5}
                placeholder="대여비"
                onChange={depositHandler}
                type="number"
                value={String(deposit)}
              />
              <div
                css={css`
                  margin-left: ${rem(35)};
                `}
              >
                <Input width={19} height={19} type="checkbox" />
              </div>
              <span
                css={css`
                  margin-left: ${rem(17)};
                `}
              >
                대여자와 협의
              </span>
            </div>

            <div css={marginTop}>
              <textarea
                css={textareaStyle}
                placeholder="용품에 대한 설명을 입력해주세요"
                onChange={contentHandler}
                value={content}
              />
            </div>
          </div>
          <div>
            <div
              css={css`
                margin-top: ${rem(32)};
              `}
            >
              대여 불가능한 날짜 선택하기
              <div>
                <Calendar />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        css={[
          flexBetween,
          css`
            justify-content: flex-start;
            margin-top: ${rem(22)};
          `,
        ]}
      >
        <UploadImg />
      </div>
      <div>
        <Button
          text="등록"
          width={rem(97)}
          height={rem(40)}
          background={color.point}
          color={color.white}
          border="none"
          size={rem(14)}
          margin={`${rem(30)} 0`}
          onClick={wrightHandler}
        />
      </div>
    </div>
  );
};

export default Writing;
