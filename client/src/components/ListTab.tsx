import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { rem } from '../common';

const container = css`
  width: ${rem(1280)};
  margin: 0 auto;
  height: ${rem(50)};
  align-items: center;
`;

function ListTab() {
  return (
    <header css={[container, `margin-top: ${rem(16)}`]}>
      <Link to="/main">
        <BackButton />
      </Link>
    </header>
  );
}

export default ListTab;
