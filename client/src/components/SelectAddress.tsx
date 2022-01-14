/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { searchAddress, selectAddress, showAddressList } from '../Atom';
import { color, rem, shadow } from '../common';

const addressListStyle = css`
  background-color: ${color.white};
  box-shadow: ${shadow};
  border-radius: 0.3125rem;
  padding: 0.35rem 0;
  margin-top: 0.3rem;
`;

const contentStyle = css`
  font-size: 0.875rem;
  padding: 0.7rem 0.75rem;
  transition: 0.1s;
  :hover {
    background-color: #f0f0f0;
    cursor: pointer;
  }
`;

const fontSize14 = css`
  font-size: 0.875rem;
`;

interface Style {
  width?: number;
}

export default function SelectAddressList({ width }: Style) {
  const setSelectAddress = useSetRecoilState(selectAddress);
  const setSearchAddress = useSetRecoilState(searchAddress);
  const setShowAddress = useSetRecoilState(showAddressList);

  const selectAddressHandler = (e: any) => {
    setSelectAddress(e.target.textContent);
    setSearchAddress([]);
    setShowAddress(false);
  };

  const addressList = useRecoilValue(searchAddress);
  return (
    <div
      css={[
        addressListStyle,
        css`
          width: ${width ? rem(width) : rem(372)};
        `,
      ]}
    >
      {addressList.length > 0 ? null : (
        <div
          css={[fontSize14, contentStyle]}
          onClick={() => setShowAddress(false)}
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
