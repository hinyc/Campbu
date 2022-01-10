/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Input from '../components/Input';
import {
  color,
  confirm,
  flexVertical,
  flexBetween,
  rem,
  flex,
  adressAPI,
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
} from '../Atom';
import axios from 'axios';
import SelectAdressList from '../components/SelectAdress';

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

const uploadImg = css`
  border: 1px solid ${color.border};
  border-radius: 0.3125rem;
  margin-right: 0.625rem;
  margin-bottom: 0.625rem;
  text-align: center;
  width: 7rem;
  height: 7rem;
`;
const marginRightZero = css`
  margin-right: 0;
`;
const addImg = css`
  font-size: 90px;
`;

const UploadImg = () => {
  return (
    <div
      css={[
        confirm,
        flex,
        css`
          width: 29.9375rem;
          flex-wrap: wrap;
        `,
      ]}
    >
      <div css={uploadImg}>업로드한 이미지 미리보기</div>
      <div css={uploadImg}>업로드한 이미지 미리보기</div>
      <div css={uploadImg}>업로드한 이미지 미리보기</div>
      <div css={[uploadImg, marginRightZero]}>업로드한 이미지 미리보기</div>
      <div css={uploadImg}>업로드한 이미지 미리보기</div>
      <div css={[uploadImg, addImg, marginRightZero]}>+</div>
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
          `https://www.juso.go.kr/addrlink/addrLinkApi.do?currentPage=1&countPerPage=20&keyword=${address}&confmKey=${adressAPI}&resultType=json`,
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
              {showAdress ? <SelectAdressList /> : null}
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
