import Reservation from '../../components/Reservation';
import { css } from '@emotion/react';
import { rem } from '../../common';

const container = css`
  width: ${rem(1280)};
  margin: ${rem(16)} auto;
`;

const BorrowList = () => {
  return (
    <>
      <Reservation />
    </>
  );
};

export default BorrowList;
