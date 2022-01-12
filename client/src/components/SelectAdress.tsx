/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { searchAddress, selectAddress, showAddressList } from '../Atom';
import { color, rem, shadow } from '../common';

const addressListStyle = css`
  width: ${rem(372)};
  background-color: ${color.white};
  box-shadow: ${shadow};
  border-radius: 0.3125rem;
  /* border: 1px solid ${color.border}; */
  padding: 0.75rem;
  margin-top: 0.3rem;
`;

const contentStyle = css`
  font-size: 0.875rem;
  margin: 0.1875rem 0;
  transition: 0.1s;
  :hover {
    background-color: ${color.border};
    cursor: pointer;
  }
`;

const fontSize14 = css`
  font-size: 0.875rem;
`;

export default function SelectAdressList() {
  const setSelectAdress = useSetRecoilState(selectAddress);
  const setSerchAdress = useSetRecoilState(searchAddress);
  const setShowAdress = useSetRecoilState(showAddressList);

  const selectAddressHandler = (e: any) => {
    setSelectAdress(e.target.textContent);
    setSerchAdress([]);
    setShowAdress(false);
  };

  const addressList = useRecoilValue(searchAddress);
  return (
    <div css={addressListStyle}>
      {addressList.length > 0 ? null : (
        <div
          css={fontSize14}
          onClick={() => {
            setShowAdress(false);
          }}
        >
          검색 결과가 없습니다.
        </div>
      )}
      {addressList.map((el) => (
        <div css={contentStyle} onClick={selectAddressHandler}>
          {el}
        </div>
      ))}
    </div>
  );
}
