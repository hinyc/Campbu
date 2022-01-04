/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const post = css`
  width: 235px;
  height: 340px;
  border: 1px solid black;
  margin: 0 10px;
`;

const img = css`
  width: 174px;
  height: 174px;
  border: 1px solid black;
`;

const span = css`
  display: block;
  font-size: 0.875rem;
`;

const address = css`
  font-size: 0.5625rem;
`;

const moneyTitle = css`
  font-size: 0.69rem;
`;

const moneyDiv = css`
  display: flex;
`;

function Product() {
  return (
    <div css={post}>
      <a href="#">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZUX7zo1yYFaBeOYIcOfcgwnULvpM7YqzXxA&usqp=CAU"
          alt="product"
          css={img}
        />
        <div>
          <span css={[span, address]}>용산구 이촌동</span>
          <span css={span}>3~4인용 텐트</span>
          <div css={moneyDiv}>
            <span>
              <div css={[span, moneyTitle]}>보증금</div>
              <div css={span}>20,000원</div>
            </span>
            <span>
              <div css={[span, moneyTitle]}>대여비</div>
              <div css={span}>20,000원</div>
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}

export default Product;
