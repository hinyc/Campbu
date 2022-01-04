/** @jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom';
import { color, rem } from '../common';
import LikeSymbol from '../components/LikeSymbol';
import ReviewBox from '../components/ReviewBox';
import { css } from '@emotion/react';

const productImg = css`
  width: ${rem(752)};
  height: ${rem(366)};
  background-size: cover;
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
  const navigate = useNavigate();
  const productImgUrl: string =
    'https://paperbarkcamp.com.au/wp-content/uploads/2019/07/paperbark_flash-camp_news_1218x650.jpg';

  return (
    <div>
      <div>
        <div>
          <div>3~4인용 텐트 빌려드려요</div>
          <LikeSymbol
            isFill={false}
            count={14}
            fontSize={18}
            borderColor={color.border}
          />
        </div>
        <div>
          <div>{`<`}</div>
          <div
            css={[
              productImg,
              css`
                background-image: ${`url(${productImgUrl})`};
              `,
            ]}
          ></div>
          <div>{`>`}</div>
        </div>
      </div>
      <div>
        <div>
          <ReviewBox
            content={reviews[0].review}
            count={reviews[0].count}
            width={200}
            isBad={false}
          />
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div></div>
      </div>

      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        목록보기
      </button>
    </div>
  );
}

export default DetailView;
