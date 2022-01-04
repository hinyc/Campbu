/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Logo from '../assets/Logo.svg';
import { rem } from '../common';

const footerStyle = css`
  height: ${rem(208)};
  background-color: #eeefcb;
`;

const divStyle = css`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const textStyle = css`
  font-size: 0.625rem;
`;

const ulStyle = css`
  list-style: none;
  padding: 0;
`;

const titleStyle = css`
  font-size: 0.75rem;
  font-weight: 700;
`;

const listStyle = css`
  font-weight: 400;
`;

const lineStyle = css`
  border: 1px solid black;
`;

const underStyle = css`
  display: block;
  text-align: center;
`;

function Footer() {
  return (
    <footer css={footerStyle}>
      <div css={divStyle}>
        <div>
          <img src={Logo} className="CampBu-logo" alt="logo" />
          <div css={textStyle}>서울특별시 강남구 논현동 384-2</div>
        </div>
        <ul css={ulStyle}>
          <li css={titleStyle}>서비스 소개</li>
          <li css={[titleStyle, listStyle]}>Wiki</li>
          <li css={[titleStyle, listStyle]}>Github</li>
        </ul>
        <ul css={ulStyle}>
          <li css={titleStyle}>Contact</li>
          <li css={[titleStyle, listStyle]}>
            <a href="https://github.com/Ohney">류 현</a>
          </li>
          <li css={[titleStyle, listStyle]}>
            <a href="https://github.com/YeChan8812">곽예찬</a>
          </li>
          <li css={[titleStyle, listStyle]}>
            <a href="https://github.com/bgyoons">백윤서</a>
          </li>
          <li css={[titleStyle, listStyle]}>
            <a href="https://github.com/hinyc">홍인열</a>
          </li>
        </ul>
      </div>
      <div css={[divStyle, underStyle]}>
        <div css={lineStyle} />
        <p css={textStyle}>© 2021 Copyright CampBu Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
