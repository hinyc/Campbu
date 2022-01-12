/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { flex, rem } from '../../common';
import { container } from './tab';

function Chat() {
  return (
    <div css={[container, flex]}>
      <div
        css={[
          css`
            width: ${rem(380)};
            display: flex;
            flex-direction: column;
            align-items: center;
          `,
        ]}
      >
        어디?
      </div>
      <div
        css={[
          css`
            display: flex;
            flex-direction: column;
            align-items: center;
            width: ${rem(530)};
          `,
        ]}
      >
        에휴
      </div>
      <div
        css={[
          css`
            width: ${rem(380)};
            display: flex;
            flex-direction: column;
            align-items: center;
          `,
        ]}
      >
        어디?
      </div>
    </div>
  );
}

export default Chat;
