/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { color, rem } from '../../common';
import ListTab from '../../components/ListTab';
import { Button } from '../../components/Button';
import emptyWriting from '../../assets/pictures/emptyWriting.svg';

const container = css`
  width: ${rem(1280)};
  margin: 0 auto;
  margin-top: ${rem(36)};
  margin-bottom: ${rem(16)};
  text-align: center;
`;

const message = css`
  font-size: ${rem(20)};
  color: ${color.mid};
  line-height: ${rem(28)};
  margin: ${rem(20)} 0;
`;

const ResistList = () => {
  return (
    <>
      <ListTab />
      <div css={container}>
        <img src={emptyWriting} alt="broken heart" />
        <p css={message}>
          찜한 목록이 없어요! <br />
          마음에 드는 캠핑용품을 찜하고 캠핑을 떠나보세요!
        </p>
        <Button
          text="캠핑 용품 보러 가기"
          width={`${rem(180)}`}
          height={`${rem(43)}`}
          background="white"
          color={`${color.mid}`}
          border={`1px solid ${color.mid}`}
          size={`${rem(14)}`}
        />
      </div>
    </>
  );
};

export default ResistList;
